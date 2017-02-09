var test = require('tape');
var assert = require('assert');

var Note = require('./../note');
var utils = require('./utils');

// SHORTEN NOTES
//
test('shorten note (by a half step)', function(t){
	var note = new Note('E.4').shorten({steps: 0.5});
	utils.assertNote(t, note, 'E', Note.DEFAULT_OCTAVE, 6);
	t.end();
});
test('shorten note (by a whole step)', function(t){
	var note = new Note('E.4').shorten({steps: 1});
	utils.assertNote(t, note, 'E', Note.DEFAULT_OCTAVE, 8);
	t.end();
});
test('shorten note (by many steps)', function(t){
	var note = new Note('E.4').shorten({ steps: 2.5});
	utils.assertNote(t, note, 'E', Note.DEFAULT_OCTAVE, 24);
	t.end();
});
test('shorten note works on rests', function(t){
	var note = Note.createRest(4).shorten();
	t.equal(note.isRest(), true);
	t.equal(note.duration, 8);
	t.end();	
})


// lengthen NOTES
//
test('lengthen note (by a half step)', function(t){
	var note = new Note('E.4').lengthen({steps:0.5});
	utils.assertNote(t, note, 'E', Note.DEFAULT_OCTAVE, 3);
	t.end();
});
test('lengthen note (by a whole step)', function(t){
	var note = new Note('E.4').lengthen({steps: 1});
	utils.assertNote(t, note, 'E', Note.DEFAULT_OCTAVE, 2);
	t.end();
});
test('lengthen note (by many steps)', function(t){
	var note = new Note('E.32').lengthen({ steps: 3});
	utils.assertNote(t, note, 'E', Note.DEFAULT_OCTAVE, 4);
	t.end();
});
test('lengthen note works on rests', function(t){
	var note = Note.createRest(4).lengthen();
	t.equal(note.isRest(), true);
	t.equal(note.duration, 2);
	t.end();	
})
test('lengthen note has a limit', function(t){
	var note = new Note('E.1').lengthen();
	utils.assertNote(t, note, 'E', Note.DEFAULT_OCTAVE, 1);
	t.end();
});
