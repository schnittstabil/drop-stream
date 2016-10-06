import test from 'ava';
import gulp from 'gulp';
import DropStream from '../';

test.cb('Gulp streams files should be dropped', t => {
	let count = 0;
	t.plan(1);

	gulp.src(__filename)
		.pipe(DropStream.obj())
		.on('error', t.end)
		.on('data', () => {
			count++;
		})
		.on('finish', () => {
			t.is(count, 0);
			t.end();
		});
});
