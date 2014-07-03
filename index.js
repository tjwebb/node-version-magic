/* jshint node:true */
/* global log */
'use strict';

global.log = require('npmlog');
log.heading = 'node-version';
if (~process.argv.indexOf('--verbose')) log.level = 'verbose';

var path = require('path');
var child = require('child_process');
var n = require('n-api');
var semver = require('semver');
var Resolver = require('node-version-resolver');
var pkg = require(path.resolve(process.cwd(), 'package.json'));

if (!pkg.engines || !pkg.engines.node) {
  log.warn(pkg.name, 'I can\'t validate the node version if your engines.node is empty in package.json');
  return;
}

if (semver.satisfies(process.version, pkg.engines.node)) {
  log.info(pkg.name, 'node version', process.version, 'satisfies', pkg.engines.node);
  return;
}

var r = new Resolver();
var required = r(pkg.engines.node).satisfy(process.version, r.latest_stable);

log.info(pkg.name, 'needs node', required);
if (!n.bin(required)) {
  log.http(required, 'installing...');
  n(required);
  n(process.version);
}

log.info(pkg.name, 'running with node', required);
n.use.sync(required, process.argv.join(' '));
process.exit(0);
