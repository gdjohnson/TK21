const fs = require('fs')
const md = require('markdown-it')()
const style = require('./css')

const getLinkList = (folder) => {
  let linkList = '';
  
  fs.readdirSync(folder)
    .filter((file) => file.indexOf('.') !== 0)
    .forEach((file) => {
      // get file name sans extension
      fileSE = file.slice(0, file.length - 3);
      // const pOpen = '<p>'
      // const link = `<a href='${folder}/${file.slice(0, file.length - 3)}'>${file}</a>`
      // const pClose = '</p>'
      // linkList = linkList + pOpen + link + pClose 
      const link = `[${fileSE}](${folder}/${fileSE})\n\n`
      linkList += link;
    });
  
  return linkList;
}

const getHomePage = () => {
  const textsTitle = '# Texts \n';
  const textsList = getLinkList('./texts')
  const conceptsTitle = '# Concepts \n'
  const conceptsList = getLinkList('./concepts')
  const page = (
    style
    + textsTitle + textsList
    + conceptsTitle + conceptsList
  )
  return md.render(page)
}

module.exports = { getHomePage, getLinkList };