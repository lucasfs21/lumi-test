'use strict';

const { PdfReader } = require('pdfreader');
const parse = require('./parse.js');

class Parser {

  constructor (options) {

    this.reader = new PdfReader();

  }

  async parse (buffer, filename) {
    try {
      const data = await parse(buffer, this.reader, filename);
      const outputString = JSON.stringify(data, null, 2);

      return outputString;
    } catch (err) {
      console.error(err);
    }

  }

}

module.exports = Parser;

if (!module.parent)
  require('./standalone.js');
