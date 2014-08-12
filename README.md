## Important: This project is no longer supported. It has been superceded by [Harmonious](https://github.com/tjwebb/harmonious)

node-version
============

[![Build Status](https://travis-ci.org/tjwebb/node-version-magic.svg?branch=master)](https://travis-ci.org/tjwebb/node-version-magic)

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

```json
{
  "engines": {
    "node": "=0.11.13"
  }
}
```

```js
/* top of file */
require('node-version-magic').enforce(function (err, satisfied) {
  if (err) throw err;

  console.log('My node version is: '+ satisfied); // satisfied = 0.11.13
});

// rest of your code...
```
