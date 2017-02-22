var test = require('tape');
var assert = require('assert');

var Note = require('./../note');
var utils = require('./utils');

// TO OBJECT
//
test('convert to object', function(t){
	var note;

	note = new Note('Ab4_8');
	t.deepEqual(note.toObject({asFlat: true}), { chromatic: 9, octave: 4, duration: 8 });

	note = new Note('Cb4_4');
	t.deepEqual(note.toObject(), { chromatic: 12, octave: 4, duration: 4 });

	t.end();
});


