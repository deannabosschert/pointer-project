#!/usr/bin/env node

const csv = require('csvtojson')
const writeJson = require('../lib/write-json')
const cleanData = require('../lib/clean-data')

rawCsvToJson()

async function rawCsvToJson() {
  const csvFilePath = './data/pointer-raw.csv'
  const json = await csv().fromFile(csvFilePath)

  return writeJson(cleanData(json))
}
