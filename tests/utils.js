// HELPER FUNCTIONS
//
function assertNote(t, note, signature, octave, duration, msg){
	t.equal(note.getSig(), signature, msg + ': unequal signatures');
	t.equal(note.octave, octave, msg + ': unequal note octaves');
	t.equal(note.duration, duration, msg + ': unequal note durations');
}

// test('create note from object', function(t){
// 	var note = new Note();
// 	t.end();
// });

module.exports = {
	assertNote: assertNote
}