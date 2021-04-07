#!/usr/bin/env node
'use strict'

const path = require('path')
const args = require('args')

const App = require('./app')

const getStartMessage = require('./messages/getStartMessage')
const getComputedFlags = require('./getComputedFlags')

args
  .option('port', 'The port for the server to listen', 9080)
  .option('index', 'The index.html file to expose', '')
  .option('directory', 'The working directory to serve the files on', path.resolve(process.cwd()))
  .option('ssl', 'An option to declare on a secured connection')
  .option('key', 'A key for an SSL connection')
  .option('cert', 'A certification for an SSL connection')

const flags = args.parse(process.argv)

console.log('flags', flags)

const app = new App(getComputedFlags(flags))

app.start().then((app) => {
  console.log(getStartMessage(`Server is up:\n${flags.ssl ? 'https' : 'http'}://localhost:${app.port}`, app))
})

process.on('SIGTERN', () => process.exit())
process.on('SIGINT', () => process.exit())
process.on('exit', () => app.stop())
