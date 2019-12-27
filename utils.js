function dropTitle(content) {
  return content.replace(/#.+?##/s, '##')
}

function dropAnchor(content) {
  return content.replace(/<a.+<\/a>\n/g, '\n')
}

function replaceBrWithNewline(content) {
  return content.replace(/<br \/>/g, '\n')
}

function processImg(content) {
  return content.replace(
    /!\[\S*\]\((.*?)\)/g,
    '<img src="$1" referrerpolicy="no-referrer">'
  )
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
  processImg,
  getYuqueSlug
}
