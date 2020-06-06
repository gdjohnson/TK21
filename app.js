const express = require('express')
const fs = require('fs')
const index = require('./index')
const glossary = require('./glossary/index')
const style = require('./style')
const { renderMd } = require('./markdown-config')
const app = express()
const port = 3000

const buildRoutes = (folders) => {
  folders.forEach((folder) => {
    app.get(`/${folder}/:id`, (req , res) => {
      let mdFile
      fs.readFile(`./${folder}/${req.params.id}.md`, 'utf8', (err, data) => {
        if (err) return res.send('404 Not Found')
        mdFile = renderMd(data)
        return res.send(style + mdFile)
      })
    })
  })
}

buildRoutes(['texts', 'concepts', 'glossary'])

// Splash
app.get('/', (req, res) => res.send(style + index.getHomePage()))

// Glossary
app.get('/glossary', (req, res) => {
  return res.send(style + glossary.getIndexPage())
})

app.listen(port, () => console.log(`TK21, now listening at http://localhost:${port}`))