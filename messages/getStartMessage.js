'use strict'

const getTitle = require('./getTitle')

const optionsToPrint = ['port', 'directory', 'index']

const defaultValues = {
  'index': 'No index default file'
}

const getStartMessage = (message, options) => {
  const info = options ? optionsToPrint.reduce((str, key) => {
    const value = options[key]
    return str + (str ? '\n' : '') + `${key}: ${value || defaultValues[key] || ''}`
  }, '') : ''

  return `${getTitle(message)}${info ? '\n' + info : ''}`
}

module.exports = getStartMessage
