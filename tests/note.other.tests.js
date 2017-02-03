var test = require('tape');
var assert = require('assert');

var Note = require('./../note');
var utils = require('./utils');

// OTHER NOTE TESTS
//
test('create a rest', function(t){
	var rest = Note.createRest(8);
	t.equal(rest.chromatic, undefined);
	t.equal(rest.octave, undefined);
	t.equal(rest.duration, 8);
	t.equal(rest.getSignature(), '-')
	t.end();

});
test('identify a rest', function(t){
	var note;

	note = new Note('C');
	t.equal(note.isRest(), false, 'negative control: notes are not rests')

	note = Note.createRest(16);
	t.equal(note.isRest(), true, 'positive control: rests are rests')

	t.end();
});

test('identify an accidental', function(t){
	var note;

	note = new Note('C');
	t.equal(note.isAccidental(), false, 'negative control: non-accidental')

	note = Note.createRest(16);
	t.equal(note.isAccidental(), false, 'rests are not accidentals')

	note = new Note('G#');
	t.equal(note.isAccidental(), true, 'sharps are accidentals');

	note = new Note('Db');
	t.equal(note.isAccidental(), true, 'flats are accidentals');

	t.end();
});

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

test('calculate scale distance', function(t){
	t.end();
});


