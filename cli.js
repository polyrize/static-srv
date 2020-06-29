#!/usr/bin/env node
'use strict'

const path = require('path')
const args = require('args')

const App = require('./app')

const getStartMessage = require('./messages/getStartMessage')

args
  .option('port', 'The port for the server to listen', 9080)
  .option('index', 'The index.html file to expose', '')
  .option('directory', 'The working directory to serve the files on', path.resolve(process.cwd()))

const flags = args.parse(process.argv)

const app = new App(flags)

app.start().then((app) => {
  console.log(getStartMessage(`Server is up:\nhttp://localhost:${app.port}`, app))
})

process.on('SIGTERN', () => app.stop())
process.on('SIGINT', () => app.stop())
