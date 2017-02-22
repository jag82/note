var test = require('tape');
var assert = require('assert');

var Note = require('./../note');
var utils = require('./utils');

// TO STRING
//
test('convert to string', function(t){
	var note;

	note = new Note('Ab');
	t.equal(note.toString(), 'G#4_4');
	t.equal(note.toString({ asFlat: true }), 'Ab4_4');

	note = new Note('Cb4_4');
	t.equal(note.toString(), 'B4_4');

	t.end();
});


