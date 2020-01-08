#!/usr/bin/env node

const csv = require('csvtojson')
const writeJson = require('../lib/write-json')
const cleanData = require('../lib/clean-data')
const cleanDutchData = require('../lib/clean-dutch-data')

rawCsvToJson()

async function rawCsvToJson() {
  const csvFilePaths = [
    './data/pointer-raw.csv',
    './data/dutch-stats.csv'
  ]

  const jsonPromises = csvFilePaths.map(async (filePath) => {
    const json = await csv().fromFile(filePath)

    return json
  })

  const [rawJson, dutchJson] = await Promise.all(jsonPromises)

  writeJson('pointer-raw', cleanData(rawJson))
  writeJson('dutch-stats', cleanDutchData(dutchJson))
}
