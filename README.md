# static-srv

`static-srv` is a library that runs a static server via CLI.

```
npx static-srv
```

## Configurations
* `-p`, `--port` - The port number the server will listen to (default is 9080)
* `-i`, `--index` - Index file name to load on default. If not provided - the files will be served normally with no default route for index.html.
* `-d`, `--directory` - The directory to serve the files from. Default is the current location of the process (`process.cwd()`)
* `-s`, `--ssl` - A boolean flag that declares on a secured connection. Default is false
* `-c`, `--cert` - A path for certificate file
* `-k` `--key` - A path for a key file

## It is optional for wrapping it up in code
It's possible to use it via code - though not recommended for production environments.

```
const Server = require('static-srv')
const app = new Server({port, index, directory}) // supports optional `ssl`, `cert` and `key` as well
app.start()
app.stop()
```

Server's `start` and `stop` return promises! Perfect for scripting.
```
app.start().then((app) => console.log('App is up', app.port))
```


## Express wrapper
Since static-srv is based on express.js, you can access the express instance via
```
(new Server(...)).instance
```
