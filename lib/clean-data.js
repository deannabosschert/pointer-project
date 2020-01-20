module.exports = (data) => {
  return data
    .map(item => ({
      id: item.concerncode && item.concerncode.toLowerCase(),
      naam: item.bedrijfsnaam && item.bedrijfsnaam.toLowerCase(),
      soortenZorg: getCareTypesFromItem(item),
      omzet: convertKeyToNumber(item, 'omzet'),
      omzetPerFte: convertKeyToNumber(item, 'omzet_fte'),
      percentageWinst: convertKeyToNumber(item, 'perc_winst'),
      personeelskosten: convertKeyToNumber(item, 'personeelskostentotaal'),
      percentageLoon: convertKeyToNumber(item, 'perc_loon'),
      plaats: getKeyFromItem(item, 'plaats'),
      winst: convertKeyToNumber(item, 'winst'),
      jaar: getKeyFromItem(item, 'jaar')
    }))
    .reduce((results, currentItem) => {
      const defaultItem = {
        id: currentItem.id,
        naam: currentItem.naam,
        soortenZorg: currentItem.soortenZorg,
        plaatsen: [currentItem.plaats],
        jaarVerslagen: {
          [currentItem.jaar]: currentItem
        }
      }

      const defaultYear = {
        ...currentItem
      }

      const foundCompany = results[currentItem.id]

      if (foundCompany) {
        foundCompany.jaarVerslagen[currentItem.jaar] = defaultYear
        foundCompany.plaatsen.push(currentItem.plaats)

        return results
      }

      results[currentItem.id] = defaultItem

      return results
    }, {})
}

function getKeyFromItem(item, key) {
  const lowerCasedKey = item[key] && item[key].toLowerCase()

  return (lowerCasedKey !== 'na' && lowerCasedKey !== 'no' && lowerCasedKey !== 'nee')
    ? item[key].toLowerCase() : null
}

function convertKeyToNumber(item, key) {
  const itemKey = getKeyFromItem(item, key)

  return Number(itemKey) !== 0 ? Number(itemKey) : null
}

function getCareTypesFromItem(item) {
  return Object.keys(item)
    .reduce((careTypes, currentKey) => {
      const currentKeyIsCare = currentKey === 'geestelijkegezondheidszorg' ||
        currentKey === 'gehandicaptenzorg' ||
        currentKey === 'thuiszorg'

      if (currentKeyIsCare) {
        careTypes.push(currentKey)
      }

      return careTypes
    }, [])
}
