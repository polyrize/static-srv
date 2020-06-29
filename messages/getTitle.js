'use strict'

const getMaxLineLength = (str) => {
  if (!str) {
    return 0
  }
  const lines = str.split('\n')
  return lines.reduce((max, line) => Math.max(max, line.length), 0)
}

const getLine = (str) => {
  if (!str) {
    return ''
  }
  return (new Array(getMaxLineLength(str))).fill('-').join('')
}

const getTitle = (str) => {
  if (!str) {
    return ''
  }
  const line = getLine(str)
  return `${line}\n${str}\n${line}`
}

module.exports = getTitle
