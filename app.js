const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const index = require('./index')
const style = require('./css')
const md = require('./markdown-config')

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