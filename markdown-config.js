const camelize = (str) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
    .replace(/\s+/g, '')
}

const getFileList = () => {
  const files = {}
  fs.readdirSync('./texts').forEach((file) => {
    // get file name sans extension
    fileSE = file.slice(0, file.length - 3)
    files[fileSE] = '/texts/' + fileSE
  })
  fs.readdirSync('./concepts').forEach((file) => {
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

const mdConfig = { typographer: true };

const wikiLinksConfig = {
  linkpattern: '/\[\[([\w\s/]+)(\|([\w\s/]+))?\]\]/',
  generatePageNameFromLabel: customWikiLinks,
  uriSuffix: '',
}
  
const md = require('markdown-it')(mdConfig)
  .use(require('markdown-it-wikilinks')(wikiLinksConfig))
  .use(require('markdown-it-wiki-toc'))
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-abbr'))
  .use(require('markdown-it-sub'))
  .use(require('markdown-it-sup'))
  .use(require('markdown-it-front-matter'))

exports.module = md