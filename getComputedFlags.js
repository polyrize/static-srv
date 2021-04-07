'use strict'

const path = require('path')
const fs = require('fs')

const getFile = (file) => {
  return fs.readFileSync(path.resolve(file), {encoding: 'utf8'})
}

const keyToTranslator = {
  'cert': getFile,
  'key': getFile
}

const getComputedFlags = (flags) => {
  if (!flags) {
    return null
  }
  return Object.entries(flags).reduce((obj, [key, value]) => {
    obj[key] = (key in keyToTranslator) ? keyToTranslator[key](value, key) : value
	return obj
  }, {})
}

module.exports = getComputedFlags