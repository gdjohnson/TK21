const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const index = require('./index')
const style = require('./css')

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => {
    return word.toUpperCase()
  }).replace(/\s+/g, '')
}



const getFileList = () => {
  const files = {}
  fs.readdirSync('./texts').forEach((file) => {
    // get file name sans extension
    fileSE = file.slice(0, file.length - 3)
    files[fileSE] = '/texts/' + fileSE
  })
  fs.readdirSync('./concepts').forEach((file) => {
    // get file name sans extension
    fileSE = file.slice(0, file.length - 3)
    files[fileSE] = '/concepts/' + fileSE
  })
  return files
}

const customWikiLinks = (label) => {
  label = camelize(label)
  fileList = getFileList()
  return fileList[label]
}
  
const md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
  })  
  .use(require('markdown-it-wikilinks')({
    linkpattern: '/\[\[([\w\s/]+)(\|([\w\s/]+))?\]\]/',
    generatePageNameFromLabel: customWikiLinks,
    uriSuffix: '',
  }))
  .use(require('markdown-it-wiki-toc'))
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-abbr'))
  .use(require('markdown-it-sub'))
  .use(require('markdown-it-sup'))

app.get('/texts/:id', (req , res) => {
  let mdFile
  fs.readFile('./texts/' + req.params.id + '.md', 'utf8', (err, data) => {
    if (err) return res.send('404 Not Found')
    mdFile = md.render(data)
    return res.send(style + mdFile)
  })
})
app.get('/concepts/:id', (req , res) => {
  let mdFile
  fs.readFile('./concepts/' + req.params.id + '.md', 'utf8', (err, data) => {
    if (err) return res.send('404 Not Found')
    mdFile = md.render(data)
    return res.send(style + mdFile)
  })
})

app.get('/', (req, res) => res.send(style + index.getHomePage()))

app.listen(port, () => console.log(`TK21 listening at http://localhost:${port}`))