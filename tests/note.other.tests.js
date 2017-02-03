var test = require('tape');
var assert = require('assert');

var Note = require('./../note');
var utils = require('./utils');

// OTHER NOTE TESTS
//
test('get note signature', function(t){
	var note;

	note = new Note('A#');
	t.equal(note.getSignature(), 'A#');
	t.equal(note.getSignature({asFlat: true}), 'Bb');

	note = new Note('Ab');
	t.equal(note.getSignature(), 'G#');
	t.equal(note.getSignature({asFlat: true}), 'Ab');

	note = new Note('A##');
	t.equal(note.getSignature(), 'B');
	t.equal(note.getSignature({asFlat: true}), 'B');

	note = new Note('Abbb');
	t.equal(note.getSignature(), 'F#');
	t.equal(note.getSignature({asFlat: true}), 'Gb');

	t.end();
});

