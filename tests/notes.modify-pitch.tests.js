var test = require('tape');
var assert = require('assert');

var Note = require('./../note');
var utils = require('./utils');

// SET PITCH
//
test.skip('set pitch', function(t){
	t.equal(true, false, 'TODO:');
	// var note;
	
	// note = new Note('E4').setPitch('F#5');
	// utils.assertNote(t, note, 'F', 4, Note.DEFAULT_DURATION);
	
	t.end();
});

// RAISE PITCH
//
test('raise note (one semitone)', function(t){
	var note = new Note('E4').raise();
	utils.assertNote(t, note, 'F', 4, Note.DEFAULT_DURATION);
	t.end();
});
test('raise note (to accidental)', function(t){
	var note = new Note('D4').raise();
	utils.assertNote(t, note, 'D#', 4, Note.DEFAULT_DURATION);
	t.end();
});
test('raise note (from accidental)', function(t){
	var note = new Note('D#4').raise();
	utils.assertNote(t, note, 'E', 4, Note.DEFAULT_DURATION);
	t.end();
});
test('raise note (across an octave)', function(t){
	var note = new Note('B4').raise();
	utils.assertNote(t, note, 'C', 5, Note.DEFAULT_DURATION);
	t.end();
});
test('raise note (many semitones)', function(t){
	var note = new Note('E4').raise({ steps: 12 });
	utils.assertNote(t, note, 'E', 5, Note.DEFAULT_DURATION);
	t.end();
});
test('raise note (many, many semitones)', function(t){
	var note = new Note('E4').raise({ steps: 37 });
	utils.assertNote(t, note, 'F', 7, Note.DEFAULT_DURATION);
	t.end();
});
test('raise note ignores rests', function(t){
	var note = Note.createRest(8).raise();
	t.equal(note.isRest(), true);
	t.end();	
})


// LOWER PITCH
//
test('lower note (one semitone)', function(t){
	var note = new Note('F4').lower();
	utils.assertNote(t, note, 'E', 4, Note.DEFAULT_DURATION);
	t.end();
});
test('lower note (to accidental)', function(t){
	var note = new Note('D4').lower();
	utils.assertNote(t, note, 'C#', 4, Note.DEFAULT_DURATION);
	t.end();
});
test('lower note (from accidental)', function(t){
	var note = new Note('D#4').lower();
	utils.assertNote(t, note, 'D', 4, Note.DEFAULT_DURATION);
	t.end();
});
test('lower note (across an octave)', function(t){
	var note = new Note('C4').lower();
	utils.assertNote(t, note, 'B', 3, Note.DEFAULT_DURATION);
	t.end();
});
test('lower note (many semitones)', function(t){
	var note = new Note('E4').lower({ steps: 12 });
	utils.assertNote(t, note, 'E', 3, Note.DEFAULT_DURATION);
	t.end();
});
test('lower note (many, many semitones)', function(t){
	var note = new Note('F4').lower({ steps: 37 });
	utils.assertNote(t, note, 'E', 1, Note.DEFAULT_DURATION);
	t.end();
})
test('lower note ignores rests', function(t){
	var note = Note.createRest(8).lower();
	t.equal(note.isRest(), true);
	t.end();	
})
