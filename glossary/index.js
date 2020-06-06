const { renderMd } = require('../markdown-config')
const { getLinkList } = require('../index')
const md = require('markdown-it')()

const getIndexPage = () => {
    const allTitle = '# All entries \n'
    const allText= getLinkList('glossary/all')
    const page = (
        allTitle + allText
    )
    return renderMd(page)
}

module.exports = { getIndexPage }