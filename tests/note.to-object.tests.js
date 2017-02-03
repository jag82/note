var test = require('tape');
var assert = require('assert');

var Note = require('./../note');
var utils = require('./utils');

// TO OBJECT
//
test('convert to object', function(t){
	var note;

	note = new Note('Ab4.8');
	t.deepEqual(note.toObject({asFlat: true}), { letter: 'A', accidental: 'b', octave: 4, duration: 8 });

	note = new Note('Cb4.4');
	t.deepEqual(note.toObject(), { letter: 'B', accidental: '', octave: 4, duration: 4 });

	t.end();
});


