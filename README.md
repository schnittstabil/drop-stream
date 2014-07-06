# drop-stream [![Dependencies Status Image](https://gemnasium.com/schnittstabil/drop-stream.svg)](https://gemnasium.com/schnittstabil/drop-stream) [![Build Status Image](https://travis-ci.org/schnittstabil/drop-stream.svg)](https://travis-ci.org/schnittstabil/drop-stream) [![Coverage Status](https://coveralls.io/repos/schnittstabil/drop-stream/badge.png)](https://coveralls.io/r/schnittstabil/drop-stream)

A Duplex stream which discards all chunks passed through.

## Usage

Install using:

```bash
npm install drop-stream --save
```

Then pipe through a drop instance:

```Javascript
var DropStream = require('drop-stream'),
    PassThrough = require('stream').PassThrough,
    opts = {objectMode: true},
    pre = new PassThrough(opts),
    drop = DropStream.obj(),
    post = new PassThrough(opts),
    count = 0;

post.on('data', function() {
  count++;
});

post.on('finish', function() {
  assert.strictEqual(count, 0, count + ' chunks detected'); // won't throw
});

pre.pipe(drop).pipe(post);

pre.write('foo');
pre.write(1);
pre.write({ foobar: 'foobar', answer: 42 });
pre.write('bar');
pre.end();
```

## API

### Class: DropStream

Drop streams are [Transform](http://nodejs.org/api/stream.html#stream_class_stream_transform) streams.

#### new DropStream([options])

* _options_ `Object` passed through [new stream.Transform([options])](http://nodejs.org/api/stream.html#stream_new_stream_transform_options)

Note: The `new` operator can be omitted

#### DropStream#obj([options])

A convenience wrapper for `new DropStream({objectMode: true, ...})`.

## License

Copyright (c) 2014 Michael Mayer

Licensed under the MIT license.
