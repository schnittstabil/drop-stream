'use strict';
var PassThrough = require('stream').PassThrough,
    DropStream = require('./index'),
    assert = require('assert'),
    gulp = require('gulp');

describe('String streams', function() {
  var input = ['foo', '\uD834\uDF06', 'bar'];

  it('chunks should be dropped', function(done) {
    var pre = new PassThrough(),
        sut = new DropStream(),
        post = new PassThrough(),
        count = 0;

    post.on('data', function() {
      count++;
    });

    post.on('finish', function() {
      assert.strictEqual(count, 0, count + ' chunks detected');
      done();
    });

    pre.pipe(sut).pipe(post);

    input.forEach(function(i) {
      pre.write(i);
    }, pre);
    pre.end();
  });

  it('should be recorded with decodeStrings:false option', function(done) {
    var pre = new PassThrough(),
        sut = new DropStream({decodeStrings: false}),
        post = new PassThrough(),
        count = 0;

    post.on('data', function() {
      count++;
    });

    post.on('finish', function() {
      assert.strictEqual(count, 0, count + ' chunks detected');
      done();
    });

    pre.pipe(sut).pipe(post);

    input.forEach(function(i) {
      pre.write(i);
    }, pre);
    pre.end();
  });
});

describe('Mixed object streams', function() {
  // no null (!)
  var input = ['foo', 1, { foobar: 'foobar', answer: 42 }, {}, 'bar',
        undefined];
  it('chunks should be dropped', function(done) {
    var opts = {objectMode: true},
        pre = new PassThrough(opts),
        sut = DropStream.obj(),
        post = new PassThrough(opts),
        count = 0;

    post.on('data', function() {
      count++;
    });

    post.on('finish', function() {
      assert.strictEqual(count, 0, count + ' chunks detected');
      done();
    });

    pre.pipe(sut).pipe(post);

    input.forEach(function(i) {
      pre.write(i);
    }, pre);
    pre.end();
  });
});

describe('Gulp streams', function() {
  it('files should be dropped', function(done) {
    var sut = new DropStream.obj(),
        count = 0;
    gulp.src(__filename)
      .pipe(sut)
      .on('error', done)
      .on('data', function() {
        count++;
      })
      .on('finish', function() {
        assert.deepEqual(count, 0, count + ' chunks detected');
        done();
      });
  });
});

describe('DropStream constructor', function() {
  it('should return new instance w/o new', function() {
    var sut = DropStream,
        instance = sut();
    assert.strictEqual(instance instanceof DropStream, true);
  });
});
