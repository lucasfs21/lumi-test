"use strict";

const Bufferer = require("../bufferer");
const Parser = require("../parser");
const { createReadStream } = require("fs");
const { PrismaClient } = require ('@prisma/client')

const prisma = new PrismaClient()

process.on("message", async (options) => {
  const { filenames } = options;
  const parser = new Parser();

  const parsingQueue = filenames.reduce(async (result, filename) => {
    await result;

    const parseAndLog = async (buf) => {
      const data = await parser.parse(buf, filename);
      await prisma.fatura.create({
          data: JSON.parse(data),
        })
    };
    
    return new Promise((resolve, reject) => {
      const reader = createReadStream(filename);
      const bufferer = new Bufferer({ onEnd: parseAndLog });

      reader.pipe(bufferer).once("finish", resolve).once("error", reject);
    });
  }, true);

  try {
    await parsingQueue;
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
