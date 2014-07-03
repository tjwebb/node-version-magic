global.log = require('npmlog');
log.heading = 'node-version';

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

describe('node-version-magic', function () {

  describe('#enforce', function () {
    it('should validate this process', function () {
      require('../').enforce(require('../package'));
    });
    it('should start second process', function (done) {
      if (process.version === 'v0.11.12') done();

      require('../').enforce({ engines: { node: '=0.11.12' } }, function (satisfied) {
        console.log(satisfied);
        done();
      });
    });
  });

});
