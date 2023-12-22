const express = require("express");
const app = express();
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const { Blob } = require("buffer");

const prisma = new PrismaClient();

app.use(cors());

app.listen(3001, () => {
  console.log("Api running on port 3001");
});

app.get("/getPdf/", async (req, res) => {
  var data =  fs.readFileSync(req.query.pdf);
  res.contentType("application/pdf");
  res.send(data);
})

app.get("/getData/:numeroCliente", async (req, res) => {
  try {
    let results = await prisma.fatura.findMany({
      where: { numeroCliente: req.params.numeroCliente },
    });

    res.status(200).send(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
