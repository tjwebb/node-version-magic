global.log = require('npmlog');
log.heading = 'node-version';

var assert = require('chai').assert;

describe('node-version-magic', function () {

  describe('#enforce', function () {
    it('should validate this process', function (done) {
      require('../').enforce(require('../package'), function (err, satisfied) {
        assert.equal(process.version, satisfied);
        done();
      });
    });
    it('should start second process', function (done) {
      if (process.version === 'v0.11.12') return done();

      require('../').enforce({ engines: { node: '=0.11.12' } }, function (err, satisfied) {
        console.log(satisfied);
        done();
      });
    });
  });

});
