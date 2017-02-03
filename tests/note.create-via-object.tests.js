var test = require('tape');
var assert = require('assert');

var Note = require('./../note');
var utils = require('./utils');

// CREATE NOTE VIA OBJECT
//
test('new note via object (with letters)', function(t){
	var note;

	note = new Note({letter: 'C'});
	utils.assertNote(t, note, 'C', Note.DEFAULT_OCTAVE, Note.DEFAULT_DURATION, 'accepts a letter (lowest)');

	note = new Note({letter: 'B'});
	utils.assertNote(t, note, 'B', Note.DEFAULT_OCTAVE, Note.DEFAULT_DURATION, 'accepts a letter (highest)');

	note = new Note({letter: 'g'});
	utils.assertNote(t, note, 'G', Note.DEFAULT_OCTAVE, Note.DEFAULT_DURATION, 'accepts lowercase letters');
		
	t.throws(function(){
		note = new Note({letter: 'H'});
    }, 'throws if letter is not in scale');

	t.throws(function(){
		note = new Note({});
    }, 'throws if letter is absent');

	t.end();
});

test('new note via object (with accidentals)', function(t){
	var note;

	//the normal way:
	note = new Note({ letter: 'F', accidental:'#'});
	utils.assertNote(t, note, 'F#', Note.DEFAULT_OCTAVE, Note.DEFAULT_DURATION, 'accepts a sharp (char)');

	note = new Note({ letter: 'G', accidental:'♯'});
	utils.assertNote(t, note, 'G#', Note.DEFAULT_OCTAVE, Note.DEFAULT_DURATION, 'accepts a sharp (symbol)');

	note = new Note({ letter: 'A', accidental:'b'});
	utils.assertNote(t, note, 'G#', Note.DEFAULT_OCTAVE, Note.DEFAULT_DURATION, 'accepts a flat (char)');

	note = new Note({ letter: 'B', accidental:'♭'});
	utils.assertNote(t, note, 'A#', Note.DEFAULT_OCTAVE, Note.DEFAULT_DURATION, 'accepts a flat (symbol)');

	note = new Note({ letter: 'C', accidental:'##'});
	utils.assertNote(t, note, 'D', Note.DEFAULT_OCTAVE, Note.DEFAULT_DURATION, 'accepts multiple accidentals');

	note = new Note({ letter: 'C', accidental:'b'});
	utils.assertNote(t, note, 'B', Note.DEFAULT_OCTAVE, Note.DEFAULT_DURATION, 'parses non-existant accidentals');


	//since accidentals are optional, we could just pass it in with the letter :)
	note = new Note({ letter: 'F#'});
	utils.assertNote(t, note, 'F#', Note.DEFAULT_OCTAVE, Note.DEFAULT_DURATION, 'accepts a sharp (char)');

	note = new Note({ letter: 'G♯'});
	utils.assertNote(t, note, 'G#', Note.DEFAULT_OCTAVE, Note.DEFAULT_DURATION, 'accepts a sharp (symbol)');

	note = new Note({ letter: 'Ab'});
	utils.assertNote(t, note, 'G#', Note.DEFAULT_OCTAVE, Note.DEFAULT_DURATION, 'accepts a flat (char)');

	note = new Note({ letter: 'B♭'});
	utils.assertNote(t, note, 'A#', Note.DEFAULT_OCTAVE, Note.DEFAULT_DURATION, 'accepts a flat (symbol)');

	note = new Note({ letter: 'C##'});
	utils.assertNote(t, note, 'D', Note.DEFAULT_OCTAVE, Note.DEFAULT_DURATION, 'accepts multiple accidentals');

	note = new Note({ letter: 'Cb'});
	utils.assertNote(t, note, 'B', Note.DEFAULT_OCTAVE, Note.DEFAULT_DURATION, 'parses non-existant accidentals');


	t.end();
});

test('new note via object (with octaves)', function(t){
	var note;

	note = new Note({ letter: 'C', octave: 0 });
	utils.assertNote(t, note, 'C', 0, Note.DEFAULT_DURATION, 'accepts an octave (lowest)');

	note = new Note({ letter: 'C', octave: 8 });
	utils.assertNote(t, note, 'C', 8, Note.DEFAULT_DURATION, 'accepts an octave (highest)');

	note = new Note({ letter: 'C', octave: '8' });
	utils.assertNote(t, note, 'C', 8, Note.DEFAULT_DURATION, 'accepts an octave as string');

	t.throws(function(){
		note = new Note({ letter: 'C', octave: -1 });
    }, 'throws if octave is too low');

	t.throws(function(){
		note = new Note({ letter: 'C', octave: 13 });
    }, 'throws if octave is too high');

	t.end();
});

test('new note via object (with durations)', function(t){
	var note;

	note = new Note({ letter: 'C', duration: 32 });
	utils.assertNote(t, note, 'C', Note.DEFAULT_OCTAVE, 32, 'accepts a duration (short)');

	note = new Note({ letter: 'C', duration: 1 });
	utils.assertNote(t, note, 'C', Note.DEFAULT_OCTAVE, 1, 'accepts a duration (longest)');

	note = new Note({ letter: 'C', duration: '32' });
	utils.assertNote(t, note, 'C', Note.DEFAULT_OCTAVE, 32, 'accepts a duration as string');

	//TODO: we don't currently allow notes longer than a whole note (e.g. double whole note)? we could notate them via .5 (if we update the regex in note.js)

	//TODO: is there any reason to put limits on note duration?
	// t.throws(function(){
	// 	note = new Note('C.128');
 //    }, 'throws if duration is too short');

	t.throws(function(){
		note = new Note({ letter: 'C', duration: 0 });
    }, 'throws if octave is too long');
	t.throws(function(){
		note = new Note({ letter: 'C', duration: -0.5 });
    }, 'throws if octave is too long');

	t.end();

});

test('new note via object (with accidentals + octaves)', function(t){
	var note;

	note = new Note({ letter: 'D', accidental: '#', octave: 8 });
	utils.assertNote(t, note, 'D#', 8, Note.DEFAULT_DURATION, 'accepts a sharp + octave');

	note = new Note({ letter: 'D', accidental: 'b', octave: 2 });
	utils.assertNote(t, note, 'C#', 2, Note.DEFAULT_DURATION, 'accepts a flat + octave');

	t.end();
});

test('new note via object (with accidentals + durations)', function(t){
	var note;

	note = new Note({ letter: 'F', accidental: '#', duration: 8 });
	utils.assertNote(t, note, 'F#', Note.DEFAULT_OCTAVE, 8, 'accepts a sharp + duration');

	note = new Note({ letter: 'G', accidental: 'b', duration: 2 });
	utils.assertNote(t, note, 'F#', Note.DEFAULT_OCTAVE, 2, 'accepts a flat + duration');

	t.end();
});

test('new note via object (with octaves + durations)', function(t){
	var note;

	note = new Note({ letter: 'F', octave: 9, duration: 16 });
	utils.assertNote(t, note, 'F', 9, 16, 'accepts an octave + duration');

	t.end();
});

test('new note via object (with accidentals + octaves + durations)', function(t){
	var note;

	note = new Note({ letter: 'D', accidental: '#', octave: 9, duration: 16 });
	utils.assertNote(t, note, 'D#', 9, 16, 'accepts an octave + duration');

	note = new Note({ letter: 'D', accidental: 'b', octave: 5, duration: 1 });
	utils.assertNote(t, note, 'C#', 5, 1, 'accepts an octave + duration');

	t.end();

});



