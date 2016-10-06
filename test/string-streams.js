import {PassThrough} from 'stream';
import test from 'ava';
import DropStream from '../';

const fixture = ['foo', '\uD834\uDF06', 'bar'];

test.cb('chunks should be dropped', t => {
	const pre = new PassThrough();
	const post = new PassThrough();
	let count = 0;

	post.on('data', () => {
		count++;
	});

	post.on('finish', () => {
		t.is(count, 0);
		t.end();
	});

	pre.pipe(new DropStream()).pipe(post);
	fixture.forEach(i => pre.write(i));
	pre.end();
});

test.cb('should be recorded with decodeStrings:false option', t => {
	const pre = new PassThrough();
	const post = new PassThrough();
	let count = 0;

	post.on('data', () => {
		count++;
	});

	post.on('finish', () => {
		t.is(count, 0);
		t.end();
	});

	pre.pipe(new DropStream({decodeStrings: false})).pipe(post);
	fixture.forEach(i => pre.write(i));
	pre.end();
});
