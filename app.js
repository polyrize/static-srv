'use strict'

const path = require('path')
const express = require('express')
const Promise = require('bluebird')
const http = require('http')
const https = require('https')

const defaultOptions = {
  port: 9080,
  index: '',
  directory: path.resolve(process.cwd()),
  ssl: false,
  key: null,
  cert: null
}

const createExpressInstance = (options) => {
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

const getHttpInstance = (app, options) => {
  const {ssl, key, cert} = options
  if (ssl && key && cert) {
    return https.createServer({key, cert}, app)
  }
  return http.createServer(app)
}

class App {
  constructor (options) {
    const {port, directory, index, ssl, key, cert} = {...defaultOptions, ...options}
    this.port = port
    this.directory = directory
	this.ssl = ssl
	this.key = key
	this.cert = cert
    this.index = index
	this.express = null
    this.server = null
  }

  start () {
    this.express = createExpressInstance(this)
    return (new Promise((resolve) => {
      this.server = getHttpInstance(this.express, {
        ssl: this.ssl,
		key: this.key,
		cert: this.cert
	  }).listen(this.port, () => resolve(this))
    }))
  }

  stop (callback) {
    return (new Promise((resolve) => {
      if (this.server && this.server.close) {
        this.server.close(() => resolve(this))
      }
    }))
  }
}

module.exports = App
