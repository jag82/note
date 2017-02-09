var test = require('tape');
var assert = require('assert');

var Note = require('./../note');
var utils = require('./utils');

// OTHER NOTE TESTS
//
test('calculate letter distances', function(t){
	var fromNote = new Note('D4');
	var toNote;

	toNote = new Note('D4');
	t.equal(fromNote.getDistance(toNote), 0, 'to same note');

	toNote = new Note('F4');
	t.equal(fromNote.getDistance(toNote), 2, 'to higher notes (letter)');

	toNote = new Note('F#4');
	t.equal(fromNote.getDistance(toNote), 2, 'to higher notes (letter with accidental)');

	toNote = new Note('D5');
	t.equal(fromNote.getDistance(toNote), 7, 'to higher notes (octave)');

	toNote = new Note('F5');
	t.equal(fromNote.getDistance(toNote), 9, 'to higher notes (letter + octave)');

	toNote = new Note('C4');
	t.equal(fromNote.getDistance(toNote), -1, 'to lower notes (letter)');

	toNote = new Note('C#4');
	t.equal(fromNote.getDistance(toNote), -1, 'to lower notes (letter with accidental)');

	toNote = new Note('D3');
	t.equal(fromNote.getDistance(toNote), -7, 'to lower notes (octave)');

	toNote = new Note('C3');
	t.equal(fromNote.getDistance(toNote), -8, 'to lower notes (letter + octave)');

	t.end();
});
test('create a rest', function(t){
	var rest = Note.createRest(8);
	t.equal(rest.chromatic, undefined);
	t.equal(rest.octave, undefined);
	t.equal(rest.duration, 8);
	t.equal(rest.getSig(), '-')
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
	t.equal(note.getSig(), 'A#');
	t.equal(note.getSig({asFlat: true}), 'Bb');

	note = new Note('Ab');
	t.equal(note.getSig(), 'G#');
	t.equal(note.getSig({asFlat: true}), 'Ab');

	note = new Note('A##');
	t.equal(note.getSig(), 'B');
	t.equal(note.getSig({asFlat: true}), 'B');

	note = new Note('Abbb');
	t.equal(note.getSig(), 'F#');
	t.equal(note.getSig({asFlat: true}), 'Gb');

	t.end();
});


