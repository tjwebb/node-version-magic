/* jshint node:true */
/* global log */
'use strict';

global.log = require('npmlog');
log.heading = module.name;
log.level = process.env.LOG_LEVEL || 'info';

var path = require('path');
var child = require('child_process');
var n = require('n-api');
var semver = require('semver');
var Resolver = require('./resolver');

exports.enforce = function (pkg, callback) {
  log.verbose('enforce', pkg.engines);

  if (!pkg.engines || !pkg.engines.node) {
    log.warn(pkg.name, 'I can\'t validate the node version if your engines.node is empty in pkg.json');
    return;
  }

  if (semver.satisfies(process.version, pkg.engines.node)) {
    log.info(pkg.name, process.version, 'satisfies', pkg.engines.node);
    return;
  }

  var r = new Resolver(function () {
    var satisfied = r.satisfy(pkg.engines.node);
    var argv = process.argv;
    if (argv[0] === 'node') {
      argv = argv.slice(1);
    }

    log.info(pkg.name, 'needs node', satisfied);
    if (!n.bin(satisfied)) {
      log.http(satisfied, 'installing...');
      n(satisfied);
      n(process.version);
    }

    log.info(pkg.name, 'running with node', satisfied);
    n.use.sync(satisfied, argv.join(' '));
    process.exit(0);

    callback(satisfied);
  });
};
