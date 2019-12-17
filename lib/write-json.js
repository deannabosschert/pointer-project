const { promisify } = require('util')
const mkdir = promisify(require('mkdirp'))
const writeFile = promisify(require('fs').writeFile)
const path = require('path')

module.exports = async (data) => {
  const dir = path.join(__dirname, '../static/data/pointer')
  const filePath = path.join(dir, 'index.json')

  return mkdir(dir)
    .then(() => writeFile(filePath, JSON.stringify(data), 'utf-8'))
    .then(() => console.log(`Written JSON for Pointer data <3`))
    .catch(console.error)
}
