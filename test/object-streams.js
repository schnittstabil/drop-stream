import {PassThrough} from 'stream';
import test from 'ava';
import DropStream from '../';

// no null (!)
const fixture = ['foo', 1, {foobar: 'foobar', answer: 42}, {}, 'bar', undefined];

test.cb('object chunks should be dropped', t => {
	const opts = {objectMode: true};
	const pre = new PassThrough(opts);
	const post = new PassThrough(opts);
	let count = 0;

	post.on('data', () => {
		count++;
	});

	post.on('finish', () => {
		t.is(count, 0);
		t.end();
	});

	pre.pipe(DropStream.obj()).pipe(post);
	fixture.forEach(i => pre.write(i));
	pre.end();
});
