var test = require('tape');
var assert = require('assert');

var Note = require('./../note');
var utils = require('./utils');

// CREATE NOTE VIA STRING
//
test('new note via string (with letters)', function(t){
	var note;

	note = new Note('C');
	utils.assertNote(t, note, 'C', Note.DEFAULT_OCTAVE, Note.DEFAULT_DURATION, 'accepts a letter (lowest)');

	note = new Note('B');
	utils.assertNote(t, note, 'B', Note.DEFAULT_OCTAVE, Note.DEFAULT_DURATION, 'accepts a letter (highest)');

	note = new Note('g');
	utils.assertNote(t, note, 'G', Note.DEFAULT_OCTAVE, Note.DEFAULT_DURATION, 'accepts lowercase letters');
		
	t.throws(function(){
		note = new Note('H');
    }, 'throws if letter is not in scale');

	t.throws(function(){
		note = new Note('');
    }, 'throws if letter is absent');

	t.end();
});

test('new note via string (with accidentals)', function(t){
	var note;

	note = new Note('F#');
	utils.assertNote(t, note, 'F#', Note.DEFAULT_OCTAVE, Note.DEFAULT_DURATION, 'accepts a sharp (char)');

	note = new Note('G♯');
	utils.assertNote(t, note, 'G#', Note.DEFAULT_OCTAVE, Note.DEFAULT_DURATION, 'accepts a sharp (symbol)');

	note = new Note('Ab');
	utils.assertNote(t, note, 'G#', Note.DEFAULT_OCTAVE, Note.DEFAULT_DURATION, 'accepts a flat (char)');

	note = new Note('B♭');
	utils.assertNote(t, note, 'A#', Note.DEFAULT_OCTAVE, Note.DEFAULT_DURATION, 'accepts a flat (symbol)');

	note = new Note('C##');
	utils.assertNote(t, note, 'D', Note.DEFAULT_OCTAVE, Note.DEFAULT_DURATION, 'accepts multiple accidentals');

	note = new Note('Cb');
	utils.assertNote(t, note, 'B', Note.DEFAULT_OCTAVE, Note.DEFAULT_DURATION, 'parses non-existant accidentals');


	t.end();
});

test('new note via string (with octaves)', function(t){
	var note;

	note = new Note('C0');
	utils.assertNote(t, note, 'C', 0, Note.DEFAULT_DURATION, 'accepts an octave (lowest)');

	note = new Note('C8');
	utils.assertNote(t, note, 'C', 8, Note.DEFAULT_DURATION, 'accepts an octave (highest)');

	t.throws(function(){
		note = new Note('C-1');
    }, 'throws if octave is too low');

	t.end();
});

test('new note via string (with durations)', function(t){
	var note;

	note = new Note('C.32');
	utils.assertNote(t, note, 'C', Note.DEFAULT_OCTAVE, 32, 'accepts a duration (short)');

	note = new Note('C.1');
	utils.assertNote(t, note, 'C', Note.DEFAULT_OCTAVE, 1, 'accepts a duration (longest)');

	//TODO: we don't currently allow notes longer than a whole note (e.g. double whole note)? we could notate them via .5 (if we update the regex in note.js)

	//TODO: is there any reason to put limits on note duration?
	// t.throws(function(){
	// 	note = new Note('C.128');
 //    }, 'throws if duration is too short');

	t.throws(function(){
		note = new Note('C.0');
    }, 'throws if octave is too long');

	t.end();

});

test('new note via string (with accidentals + octaves)', function(t){
	var note;

	note = new Note('D#8');
	utils.assertNote(t, note, 'D#', 8, Note.DEFAULT_DURATION, 'accepts a sharp + octave');

	note = new Note('Db2');
	utils.assertNote(t, note, 'C#', 2, Note.DEFAULT_DURATION, 'accepts a flat + octave');

	t.end();
});

test('new note via string (with accidentals + durations)', function(t){
	var note;

	note = new Note('F#.8');
	utils.assertNote(t, note, 'F#', Note.DEFAULT_OCTAVE, 8, 'accepts a sharp + duration');

	note = new Note('Gb.2');
	utils.assertNote(t, note, 'F#', Note.DEFAULT_OCTAVE, 2, 'accepts a flat + duration');

	t.end();
});

test('new note via string (with octaves + durations)', function(t){
	var note;

	note = new Note('F9.16');
	utils.assertNote(t, note, 'F', 9, 16, 'accepts an octave + duration');

	t.end();
});

test('new note via string (with accidentals + octaves + durations)', function(t){
	var note;

	note = new Note('D#9.16');
	utils.assertNote(t, note, 'D#', 9, 16, 'accepts an octave + duration');

	note = new Note('Db5.1');
	utils.assertNote(t, note, 'C#', 5, 1, 'accepts an octave + duration');

	t.end();

});

