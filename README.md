node-version
============

Ensure that your Node process is running with the correct Version. If 
`process.version` is not valid according to `package.json`, then either switch
to that version using `n` if it is installed, or install it first and then
use it.

The version change will only affect the current process, and will have no effect
on the rest of your system

### 1. Install
```bash
$ npm install -g n
$ npm install --save node-version

```

`n` is the node version manage that is used to switch and download node versions.

### 2. Usage

As simple as can be:

```js
/* top of file */
require('node-version-magic');

// rest of your code...
```
