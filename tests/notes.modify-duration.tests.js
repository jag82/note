var test = require('tape');
var assert = require('assert');

var Note = require('./../note');
var utils = require('./utils');

// SHORTEN NOTES
//
test('shorten note (by one step)', function(t){
	var note = new Note('E.4').shorten();
	utils.assertNote(t, note, 'E', Note.DEFAULT_OCTAVE, 6);
	t.end();
});
test('shorten note (by many steps)', function(t){
	var note = new Note('E.4').shorten({ steps: 3});
	utils.assertNote(t, note, 'E', Note.DEFAULT_OCTAVE, 12);
	t.end();
});
test('shorten note works on rests', function(t){
	var note = Note.createRest(4).shorten();
	t.equal(note.isRest(), true);
	t.equal(note.duration, 6);
	t.end();	
})


// lengthen NOTES
//
test('lengthen note (by one step)', function(t){
	var note = new Note('E.4').lengthen();
	utils.assertNote(t, note, 'E', Note.DEFAULT_OCTAVE, 3);
	t.end();
});
test('lengthen note (by many steps)', function(t){
	var note = new Note('E.32').lengthen({ steps: 3});
	utils.assertNote(t, note, 'E', Note.DEFAULT_OCTAVE, 12);
	t.end();
});
test('lengthen note works on rests', function(t){
	var note = Note.createRest(4).lengthen();
	t.equal(note.isRest(), true);
	t.equal(note.duration, 3);
	t.end();	
})
test('lengthen note has a limit', function(t){
	var note = new Note('E.1').lengthen();
	utils.assertNote(t, note, 'E', Note.DEFAULT_OCTAVE, 1);
	t.end();
});
