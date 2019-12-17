#!/usr/bin/env node

const csv = require('csvtojson')
const writeJson = require('../lib/write-json')

rawCsvToJson()

async function rawCsvToJson() {
  const csvFilePath = './data/pointer-raw.csv'
  const json = await csv().fromFile(csvFilePath)

  return writeJson(json)
}
