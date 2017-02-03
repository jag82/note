function Note(stringOrObject, options) {
	options = options ||  { verbose: true }

	var type = typeof stringOrObject;

	var string;
	if(type === 'object'){
		var object = Object.assign(
			{ 
				accidental: '',
				octave: Note.DEFAULT_DURATION,
				duration: Note.DEFAULT_DURATION 
			}, 
			stringOrObject
		);
		string = object.letter + object.accidental + object.octave + '.' + object.duration;
	}
	else if(type === 'string') {
		string = stringOrObject;
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
	if(this.octave > 12){
		throw 'octave out of range: ' + this.octave;
	}
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

	this.chromatic = index;
	this.octave *= 1;
	this.duration *= 1;
}


//STATIC VARS
//
Note.SHARP_CHAR = '#';
Note.FLAT_CHAR = 'b';
Note.SHARP_SYMBOL = '♯';
Note.FLAT_SYMBOL = '♭';

Note.DEFAULT_OCTAVE = 4;
Note.DEFAULT_DURATION = 4;
// Note.SCALE = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
Note.SCALE_SHARPS = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
Note.SCALE_FLATS = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'];

// Note.CHROMATIC_MAP = {
// 	'C': 	1,
// 	'C#': 	2,
// 	'Db': 	2,
// 	'D': 	3,
// 	'D#': 	4,
// 	'Eb': 	4,
// 	'E': 	5,
// 	'F': 	6,
// 	'F#': 	7,
// 	'Gb': 	7,
// 	'G': 	8,
// 	'G#': 	9,
// 	'Ab': 	9,
// 	'A': 	10,
// 	'A#': 	11,
// 	'Bb': 	11,
// 	'B': 	12
// }

//STATIC METHODS
//


//GET METHODS
//
//TODO: rename this method (what are Ab, C, D#, F## called?)
Note.prototype.getSignature = function(options) {
	options = options || {};
	if(options.asFlat){
		return Note.SCALE_FLATS[this.chromatic];
	}else{
		return Note.SCALE_SHARPS[this.chromatic];
	}
}


//MODIFY METHODS
//
Note.prototype.raise = function(options){
	this.octave++;
	return this;
}


module.exports = Note;