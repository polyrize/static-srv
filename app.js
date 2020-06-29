'use strict'

const path = require('path')
const express = require('express')
const Promise = require('bluebird')

const defaultOptions = {
  port: 9080,
  index: '',
  directory: path.resolve(process.cwd())
}

const createInstance = (options) => {
  const {directory, index} = {...defaultOptions, ...options}
  const app = express()
  app.use(express.static(directory))
  if (index) {
    const indexFile = path.resolve(index)
    app.get(['/', '*'], (request, response, next) => {
      response.sendFile(indexFile)
    })
  }

  return app
}

class App {
  constructor (options) {
    const {port, directory, index} = {...defaultOptions, ...options}
    this.port = port
    this.directory = directory
    this.index = index
    this.instance = null
  }

  start () {
    this.instance = createInstance(this)
    return (new Promise((resolve) => {
      this.server = this.instance.listen(this.port, () => resolve(this))
    }))
  }

  stop (callback) {
    return (new Promise((resolve) => {
      this.server?.close(() => resolve(this))
    }))
  }
}

module.exports = App
