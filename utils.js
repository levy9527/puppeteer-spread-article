function dropTitle(content) {
  return content.replace(/#.+?##/s, '##')
}

function dropAnchor(content) {
  return content.replace(/<a.+<\/a>\n/g, '')
}

function replaceBrWithNewline(content) {
  return content.replace(/<br \/>/g, '\n')
}

function getYuqueSlug(url) {
  let lastSlashContent = url.split('/').pop()
  if (lastSlashContent.includes('?')) return lastSlashContent.split('?').shift()
  if (lastSlashContent.includes('#')) return lastSlashContent.split('#').shift()
  return lastSlashContent
}

module.exports = {
  dropTitle,
  dropAnchor,
  replaceBrWithNewline,
  getYuqueSlug
}
