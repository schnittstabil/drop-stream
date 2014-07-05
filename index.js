'use strict';
var Transform = require('readable-stream/transform'),
    inherits = require('util').inherits;

function DropStream(options) {
  if (!(this instanceof DropStream)) {
    return new DropStream(options);
  }
  Transform.call(this, options);
}
inherits(DropStream, Transform);

DropStream.prototype._transform = function(chunk, encoding, done) {
  done();
};

DropStream.obj = function (options) {
  options = options || {};
  options.objectMode = true;
  return new DropStream(options);
};

module.exports = DropStream;
