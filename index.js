const fs = require('fs')
const md = require('markdown-it')()
const style = require('./style')

const signifiedToSignifier = (str) => {
  splitStr = str[0]
  for (let i = 1; i < str.length ; i++) {
    const isYear = Number.isNaN(Number(str[i - 1])) 
      && !Number.isNaN(Number(str[i]))  
    const isCapital = str[i].toLowerCase() !== str[i];
    if (isYear || isCapital) {
      splitStr += (' ' + str[i])
    } else {
      splitStr += str[i]
    }
  }
  return splitStr
}

const getLinkList = (folder) => {
  let linkList = ''
  
  fs.readdirSync(folder)
    .filter((file) => file.indexOf('.') !== 0)
    .forEach((file) => {
      // remove extension from file name
      const fileSE = file.slice(0, file.length - 3)
      // convert filename to page title
      const title = signifiedToSignifier(fileSE)
      const link = `[${title}](${folder}/${fileSE})\n\n`
      linkList += link
    })
  
  return linkList
}

const getHomePage = () => {
  const textsTitle = '# Texts \n'
  const textsList = getLinkList('./texts')
  const conceptsTitle = '# Concepts \n'
  const conceptsList = getLinkList('./concepts')
  const page = (
    textsTitle + textsList
    + conceptsTitle + conceptsList
  )
  return md.render(page)
}

module.exports = { getHomePage, getLinkList }