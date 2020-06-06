const { getFileList, renderMd } = require('../../markdown-config')
const { getLinkList } = require('../index')
const md = require('markdown-it')()

const getIndexPage = () => {
    const allTitle = '# All entries \n'
    const allText= getLinkList('../all')
    const page = (
        allTitle + allText
    )
    return md.render(page)
}

module.exports = { getIndexPage }