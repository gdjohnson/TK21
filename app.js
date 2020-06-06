const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const index = require('./index')

function customWikiLinks(label) {
  console.log(label);
  return label.replace(/ /g, '%20');
}
  
const md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
  })  
  .use(require('markdown-it-wikilinks')({
    linkpattern: '/\[\[([\w\s/]+)(\|([\w\s/]+))?\]\]/',
    generatePageNameFromLabel: customWikiLinks,
    uriSuffix: ''
  }))
  .use(require('markdown-it-wiki-toc'))
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-abbr'))
  .use(require('markdown-it-sub'))
  .use(require('markdown-it-sup'));

app.get('/texts/:id', (req , res) => {
  let mdFile;
  fs.readFile('./texts/' + req.params.id + '.md', 'utf8', (err, data) => {
    if (err) return res.send('404 Not Found');
    mdFile = md.render(data);
    return res.send(mdFile);
  });
});

app.get('/', (req, res) => res.send(index.getHomePage()));

app.listen(port, () => console.log(`TK21 listening at http://localhost:${port}`))