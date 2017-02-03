var test = require('tape');
var assert = require('assert');

var Note = require('./note');

test('create note from string', function(t){
	var note;

	note = new Note('A');
	assertNote(t, note, 'A', '', Note.DEFAULT_OCTAVE, Note.DEFAULT_DURATION, 'with letter');
	//TODO: without letter = throws ex!

	note = new Note('C#');
	assertNote(t, note, 'C', '#', Note.DEFAULT_OCTAVE, Note.DEFAULT_DURATION, 'with accidental (sharp)');
	note = new Note('Db');
	assertNote(t, note, 'D', 'b', Note.DEFAULT_OCTAVE, Note.DEFAULT_DURATION, 'with accidental (flat)');
	// note = new Note('C##');
	// assertNote(t, note, 'D', '', Note.DEFAULT_OCTAVE, Note.DEFAULT_DURATION, 'with multiple accidentals');
	// note = new Note('Cb');
	// assertNote(t, note, 'B', '', Note.DEFAULT_OCTAVE, Note.DEFAULT_DURATION, 'with non-existant accidental');


	// note = new Note('C#4.16');
	// assertNote(t, note, 'C', '#', 4, 16, 'with octave ');
	// note = new Note('C#4.16');
	// assertNote(t, note, 'C', '#', 4, 16, 'with length');


	// note = new Note('C#4.16');
	// assertNote(t, note, 'C', '#', 4, 16, 'with all details');

	// note = new Note('C#4.16');
	// assertNote(t, note, 'C', '#', 4, 16);
	// note = new Note('C#4.16');
	// assertNote(t, note, 'C', '#', 4, 16);
	// note = new Note('C#4.16');
	// assertNote(t, note, 'C', '#', 4, 16);
	t.end();
});

test('get signature', function(t){
	t.end();
});



function assertNote(t, note, letter, accidental, octave, duration, msg){
	t.equal(note.letter, letter, msg + ': unequal note letters');
	t.equal(note.accidental, accidental, msg + ': unequal note accidentals');
	t.equal(note.octave, octave, msg + ': unequal note octaves');
	t.equal(note.duration, duration, msg + ': unequal note durations');
}

// test('create note from object', function(t){
// 	var note = new Note();
// 	t.end();
// });