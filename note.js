// object wrapper (For convenience)
function Note(arg1, options) {
	options = options ||  { verbose: true }

	var type = typeof arg1;

	if(type === 'number'){
		//this is a rest!
		this.duration = arg1;
		return;
	}

	var string;
	if(type === 'object'){
		var object = Object.assign(
			{ 
				accidental: '',
				octave: Note.DEFAULT_DURATION,
				duration: Note.DEFAULT_DURATION 
			}, 
			arg1
		);
		if(object.chromatic){
			object.letter = Note.SCALE_SHARPS[object.chromatic-1];
		}
		string = object.letter + object.accidental + object.octave + '.' + object.duration;
	}
	else if(type === 'string') {
		string = arg1;
	}
	else{
		throw 'unsupported parameter type for constructor: ' + type; 
	}

	//<letter><accidental><octave>.<duration> (e.g. A#4.16, B.4, C8, Db5)
	var regex = /^([A-Ga-g])([#b♯♭]*)(\d*)\.?(\d*)$/;
	var array = regex.exec(string);
	if(!array || array.length !== 5){
		throw 'invalid note string format: ' + string;
	}
	var letter = array[1];
	var accidental = array[2] || '';
	this.octave = array[3] || Note.DEFAULT_OCTAVE;
	this.duration = array[4] || Note.DEFAULT_DURATION;

	//validate
	if(this.duration <= 0){
		throw 'duration out of range: ' + this.duration;
	}

	//normalize
	var index = Note.SCALE_SHARPS.indexOf(letter.toUpperCase());

	for(var i = 0; i < accidental.length; i++){
		switch(accidental[i]){
			case Note.SHARP_CHAR:
			case Note.SHARP_SYMBOL:
				index++;
				break;
			case Note.FLAT_CHAR:
			case Note.FLAT_SYMBOL:
				index--;
				break;
		}
	}
	if(index < 0){
		index += 12;
	}
	else if(index >= 12){
		index -= 12;
	}

	//chromatic is 1-12
	this.chromatic = (index + 1) * 1;
	this.octave *= 1;
	this.duration *= 1;
}

Note.prototype.getDistance = function(toNote, options){
	return Note.getDistance(this, toNote, options);
}

Note.prototype.isRest = function(options){
	return Note.isRest(this, options);
}

Note.prototype.isAccidental = function(options){
	return Note.isAccidental(this, options);
}

Note.prototype.getSig = function(options){
	return Note.getSig(this, options);
}

Note.prototype.raise = function(options){
	return Note.raise(this, options);
}

Note.prototype.lower = function(options){
	return Note.lower(this, options);
}

Note.prototype.shorten = function(options){
	return Note.shorten(this, options);
}

Note.prototype.lengthen = function(options){
	return Note.lengthen(this, options);
}

Note.prototype.toString = function(options){
	return Note.toString(this, options);
}

Note.prototype.toObject = function(options){
	return Note.toObject(this, options);
}





//STATIC VARS
//
Note.REST_CHAR = '-';
Note.SHARP_CHAR = '#';
Note.FLAT_CHAR = 'b';
Note.SHARP_SYMBOL = '♯';
Note.FLAT_SYMBOL = '♭';

Note.DEFAULT_OCTAVE = 4;
Note.DEFAULT_DURATION = 4;

// Note.SCALE = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
Note.SCALE_SHARPS = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
Note.SCALE_FLATS = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'];
Note.SCALE_LETTERS = ['C','D','E','F','G','A','B'];

Note.CHROMATIC_MAP = {
	'C': 	1,
	'C#': 	2,
	'Db': 	2,
	'D': 	3,
	'D#': 	4,
	'Eb': 	4,
	'E': 	5,
	'F': 	6,
	'F#': 	7,
	'Gb': 	7,
	'G': 	8,
	'G#': 	9,
	'Ab': 	9,
	'A': 	10,
	'A#': 	11,
	'Bb': 	11,
	'B': 	12
}

//STATIC METHODS
//

Note.getDistance = function(fromNote, toNote){
    //if one note provided, compare it to middle-C
    if(!toNote){
        toNote = new Note('C4').toObject();
    }
    const fromIndex = Note.SCALE_LETTERS.indexOf(Note.getSig(fromNote).slice(0,1));
    const toIndex = Note.SCALE_LETTERS.indexOf(Note.getSig(toNote).slice(0,1));
    const scaleDist = toIndex - fromIndex;
    const octaveDist = (toNote.octave - fromNote.octave) * 7;
    return scaleDist + octaveDist;
}


//GET METHODS
//

Note.isRest = function(note){
	return note.chromatic === undefined;
}

Note.isAccidental = function(note){
	return Note.getSig(note).length === 2;
}

//TODO: rename this method (what are Ab, C, D#, F## called?)
Note.getSig = function(note, options) {
	options = options || {};
	if(Note.isRest(note)){
		return Note.REST_CHAR;
	}
	if(options.asFlat){
		return Note.SCALE_FLATS[note.chromatic-1];
	}else{
		return Note.SCALE_SHARPS[note.chromatic-1];
	}
}

// MODIFY PITCH
//
Note.raise = function(note, options){
	options = options || {};
	if(Note.isRest(note)){
		return note;
	}
	var steps = options.steps || 1;
	note.chromatic += steps;
	while(note.chromatic > 12){
		note.chromatic -= 12;
		note.octave++;
	}
	return note;
}

Note.lower = function(note, options){
	options = options || {};
	if(Note.isRest(note)){
		return note;
	}
	var steps = options.steps || 1;
	note.chromatic -= steps;
	while(note.chromatic <= 0){
		note.chromatic += 12;
		note.octave--;
	}
	return note;
}


// MODIFY DURATION
//
Note.shorten = function(note, options){
	options = options || {};
	var steps = options.steps || 1;
	var wholeSteps = Math.floor(steps);
	var halfStep = steps % 1 !== 0;

	note.duration *= Math.pow(2, wholeSteps);
	if(halfStep){
		note.duration *= 1.5;
	}
	return note;
}

Note.lengthen = function(note, options){
	options = options || {};
	var steps = options.steps || 1;
	var wholeSteps = Math.floor(steps);
	var halfStep = steps % 1 !== 0;
	note.duration /= Math.pow(2, wholeSteps);
	if(halfStep){
		note.duration = (note.duration / 2)*1.5;
	}
	if(note.duration < 1){
		note.duration = 1;
	}
	return note;
}


//TO STRING, TO OBJECT
//
Note.toString = function(note, options){
	return Note.getSig(note, options) + note.octave + '.' + note.duration;
}

Note.toObject = function(note, options){
	options = options || {};
	var signature = Note.getSig(note, options);
	return {
		letter: signature[0],
		accidental: signature[1] || '',
		chromatic: note.chromatic,
		octave: note.octave,
		duration: note.duration
	}
}

//FACTORY METHODS
Note.createRest = function(duration){
	return new Note(duration);
}


module.exports = Note;