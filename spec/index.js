global.log = require('npmlog');
log.heading = 'node-version';
log.level = 'verbose';

var assert = require('chai').assert;

describe('node-version-resolver', function () {
  var Resolver = require('../resolver');

  it('should do its thing', function (done) {
    var r = new Resolver(function () {
      assert.equal(r.satisfy('>=0.8.0 <0.9'), '0.8.27');
      assert.equal(r.satisfy('=0.11.13'), '0.11.13');
      done();
    });
  });

});

describe('node-version', function () {

  describe('#enforce', function () {
    it('should validate this process', function () {
      //assert.
    });
  });

});
