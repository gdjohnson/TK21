const fs = require('fs')
const md = require('markdown-it')()
const style = require('./css')

const getLinkList = (folder) => {
  let linkList = style;
  
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
  const textsTitle = '# Texts!  \n';
  const textsList = getLinkList('./texts')
  return md.render(textsTitle + textsList)
}

module.exports = { getHomePage, getLinkList };