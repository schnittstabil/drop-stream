import fs from 'fs';
import path from 'path';
import test from 'ava';
import DropStream from '../';

test.before(() => {
	process.chdir(path.join(__dirname, 'fixtures'));
});

test.afterEach.always(() => {
	fs.unlinkSync('done.txt');
});

test.cb('usage', t => {
	fs.createReadStream('todo.txt')
		.pipe(new DropStream())
		.pipe(fs.createWriteStream('done.txt'))
		.on('finish', () => {
			// => done.txt is empty
			t.is(fs.readFileSync('done.txt', 'utf8'), '');
			t.end();
		});
});
