var test = require('tape');
var assert = require('assert');

var Note = require('./../note');
var utils = require('./utils');

// SHORTEN NOTES
//
test('shorten normal note (by one step)', function(t){
	var note = new Note('E_4').shorten({steps:1});
	utils.assertNote(t, note, 'E', Note.DEFAULT_OCTAVE, 6);
	t.end();
});
test('shorten dotted note (by one step)', function(t){
	var note = new Note('E_3').shorten({steps:1});
	utils.assertNote(t, note, 'E', Note.DEFAULT_OCTAVE, 4);
	t.end();
});
test('shorten normal note (by two steps)', function(t){
	var note = new Note('E_4').shorten({steps: 2});
	utils.assertNote(t, note, 'E', Note.DEFAULT_OCTAVE, 8);
	t.end();
});
test('shorten dotted note (by two steps)', function(t){
	var note = new Note('E_3').shorten({steps: 2});
	utils.assertNote(t, note, 'E', Note.DEFAULT_OCTAVE, 6);
	t.end();
});
test('shorten normal note (by many steps)', function(t){
	var note = new Note('E_1').shorten({ steps: 4});
	utils.assertNote(t, note, 'E', Note.DEFAULT_OCTAVE, 4);
	t.end();
});
test('shorten dotted note (by many steps)', function(t){
	var note = new Note('E_1.5').shorten({steps: 6});
	utils.assertNote(t, note, 'E', Note.DEFAULT_OCTAVE, 12);
	t.end();
});
test('shorten note works on rests', function(t){
	var note = Note.createRest(4).shorten().shorten();
	t.equal(note.isRest(), true);
	t.equal(note.duration, 8);
	t.end();
})
test('shorten note has a limit', function(t){
	var note = new Note('E_64').shorten({ steps: 100 });
	utils.assertNote(t, note, 'E', Note.DEFAULT_OCTAVE, 128);
	t.end();
});


// lengthen NOTES
//
test('lengthen normal note (by one step)', function(t){
	var note = new Note('E_4').lengthen({steps:1});
	utils.assertNote(t, note, 'E', Note.DEFAULT_OCTAVE, 3);
	t.end();
});
test('lengthen dotted note (by one step)', function(t){
	var note = new Note('E_3').lengthen({steps:1});
	utils.assertNote(t, note, 'E', Note.DEFAULT_OCTAVE, 2);
	t.end();
});
test('lengthen normal note (by two steps)', function(t){
	var note = new Note('E_4').lengthen({steps: 2});
	utils.assertNote(t, note, 'E', Note.DEFAULT_OCTAVE, 2);
	t.end();
});
test('lengthen dotted note (by two steps)', function(t){
	var note = new Note('E_12').lengthen({steps: 2});
	utils.assertNote(t, note, 'E', Note.DEFAULT_OCTAVE, 6);
	t.end();
});
test('lengthen normal note (by many steps)', function(t){
	var note = new Note('E_32').lengthen({ steps: 4});
	utils.assertNote(t, note, 'E', Note.DEFAULT_OCTAVE, 8);
	t.end();
});
test('lengthen dotted note (by many steps)', function(t){
	var note = new Note('E_12').lengthen({steps: 6});
	utils.assertNote(t, note, 'E', Note.DEFAULT_OCTAVE, 1.5);
	t.end();
});
test('lengthen note works on rests', function(t){
	var note = Note.createRest(4).lengthen().lengthen();
	t.equal(note.isRest(), true);
	t.equal(note.duration, 2);
	t.end();
})
test('lengthen note has a limit', function(t){
	var note = new Note('E_1').lengthen();
	utils.assertNote(t, note, 'E', Note.DEFAULT_OCTAVE, 1);
	t.end();
});
