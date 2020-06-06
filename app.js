const express = require('express')
const fs = require('fs')
const index = require('./index')
const style = require('./style')
const md = require('./markdown-config')
const renderMd = md.renderMd
const app = express()
const port = 3000

console.log(md);

// ROUTES

// Homepage
app.get('/', (req, res) => res.send(style + index.getHomePage()))

// Library texts
app.get('/texts/:id', (req , res) => {
  let mdFile
  fs.readFile('./texts/' + req.params.id + '.md', 'utf8', (err, data) => {
    if (err) return res.send('404 Not Found')
    console.log(renderMd);
    mdFile = renderMd(data)
    return res.send(style + mdFile)
  })
})

// Concept entries
app.get('/concepts/:id', (req , res) => {
  let mdFile
  fs.readFile('./concepts/' + req.params.id + '.md', 'utf8', (err, data) => {
    if (err) return res.send('404 Not Found')
    mdFile = renderMd(data)
    return res.send(style + mdFile)
  })
})

app.listen(port, () => console.log(`TK21, now listening at http://localhost:${port}`))