'use strict';

const { PdfReader } = require('pdfreader');

function readPDFPages (buffer, reader=(new PdfReader())) {

  return new Promise((resolve, reject) => {
    let pages = [];
    reader.parseBuffer(buffer, (err, item) => {

      if (err)
        reject(err)

      else if (!item)
        resolve(pages);

      else if (item.page)
        pages.push({});

      else if (item.text) {
        const row = pages[pages.length-1][item.y] || [];
        row.push(item.text);
        pages[pages.length-1][item.y] = row;
      }

    });
  });

}

function parseToddPDF (pages, filename) {

  const page = pages[0]; // We know there's only going to be one page

  // Declarative map of PDF data that we expect, based on Todd's structure
  const fields = {
    numeroCliente: { row: '9.272', index: 0 },
    referenciaMes: { row: '3.9219999999999997', index: 0 },
    referenciaAno: { row: '3.9219999999999997', index: 0 },
    energiaQuantidade: { row: '14.856', index: 2 },
    energiaValor: { row: '14.856', index: 4 },
    energiaSceeIcmsQuantidade: { row: '15.456', index: 2 },
    energiaSceeIcmsValor: { row: '15.456', index: 4 },
    energiaCompensadaQuantidade: { row: '16.056', index: 2 },
    energiaCompensadaValor: { row: '16.056', index: 4 },
    contribIlumPublicaMunicipal: { row: '16.656', index: 1 },
  };

  const data = {};

  // Assign the page data to an object we can return, as per
  // our field specification
  Object.keys(fields)
    .forEach((key) => {

      const field = fields[key];
      let val = page[field.row][field.index].trim();
      val = valueFixed(key, val);

      // We don't want to lose leading zeros here, and can trust
      // any backend / data handling to worry about that. This is
      // why we don't coerce to Number.
      data[key] = val;
      data.path = filename 
    });

  // Manually fixing up some text fields so theyre usable
  // data.reqID = data.reqID.slice('Requsition ID: '.length);
  // data.date = data.date.slice('Date: '.length);

  return data;

}

function valueFixed(key, value) {
  switch(key) {
    case "numeroCliente":
      return value.split(" ")[0];
    case "referenciaMes":
      return value.split(" ")[0].split("/")[0];
    case "referenciaAno":
      return Number(value.split(" ")[0].split("/")[1])
    default:
      // Fix to USD currency
      return Number(value.replaceAll(".", "").replaceAll(",", "."));
  }
} 

module.exports = async function parse (buf, reader, filename) {
  const data = await readPDFPages(buf, reader);
  const parsedData = parseToddPDF(data, filename);
  console.log('parsedData')
  console.log(parsedData)
  return parsedData;
};
