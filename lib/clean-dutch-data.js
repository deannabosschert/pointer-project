module.exports = (data) => {
  return data.reduce((cleanedData, currentItem) => {
    cleanedData[currentItem.jaar] = currentItem

    delete cleanedData[currentItem.jaar].jaar

    return cleanedData
  }, {})
}
