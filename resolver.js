var Resolver, agent, fs, semver, _;

require('array-sugar');
agent = require('superagent');
semver = require('semver');
fs = require('fs');
_ = require('lodash');

module.exports = Resolver = (function() {
  Resolver.timeout = (process.env.NODE_ENV === 'test' ? 1 : process.env.RESOLVER_TIMEOUT || 5000);

  function Resolver(cb) {
    this.downloadVersions((function(_this) {
      return function(err, text) {
        if (err) {
          throw err;
        }
        _this.all = _.uniq(text.match(/[0-9]+\.[0-9]+\.[0-9]+/g).filter(function(version) {
          return semver.gte(version, "0.8.6");
        }).sort(function(a, b) {
          return semver.compare(a, b);
        }));
        _this.stables = _.uniq(text.match(/[0-9]+\.[0-9]*[02468]\.[0-9]+/g).filter(function(version) {
          return semver.gte(version, "0.8.6");
        }).sort(function(a, b) {
          return semver.compare(a, b);
        }));
        if (process.env.STABLE_NODE_VERSION) {
          _this.stables = _this.stables.filter(function(version) {
            return semver.lte(version, process.env.STABLE_NODE_VERSION);
          });
        }
        _this.latest_unstable = _this.all.last;
        _this.latest_stable = _this.stables.last;
        if (cb) {
          return cb(_this);
        }
      };
    })(this));
  }

  Resolver.prototype.downloadVersions = function(cb) {
    return agent.get("http://nodejs.org/dist/").timeout(Resolver.timeout).end(function(err, res) {
      if (err) {
        return cb(null, fs.readFileSync(__dirname + '/cache/node.html').toString());
      }
      return cb(null, res.text);
    });
  };

  Resolver.prototype.satisfy = function(range) {
    if (!semver.validRange(range)) {
      return this.latest_stable;
    }
    return semver.maxSatisfying(this.stables, range) || semver.maxSatisfying(this.all, range) || this.latest_stable;
  };

  return Resolver;

})();

if (!module.parent) {
  new Resolver(function(resolver) {
    if (semver.validRange(process.argv.last)) {
      return process.stdout.write(resolver.satisfy(process.argv.last) + "\n");
    } else {
      return process.stdout.write(resolver.latest_stable + "\n");
    }
  });
}
