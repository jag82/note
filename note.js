function Note(stringOrObject) {
	var type = typeof stringOrObject;
	if(type === 'string'){
		var string = stringOrObject;
		//<letter><accidental><octave>.<duration>
		var regex = /^([A-Ga-g])([#b]*)(\d*).?(\d*)$/;
		var array = regex.exec(string);
		if(!array || array.length !== 5){
			throw 'invalid note string format: ' + string;
		}
		this.letter = array[1];
		this.accidental = array[2] || '';
		this.octave = array[3] || Note.DEFAULT_OCTAVE;
		this.duration = array[4] || Note.DEFAULT_DURATION;
	}
	else if(type === 'object'){
		var object = stringOrObject;
		this.letter = object.letter;
		this.accidental = object.accidental || '';
		this.octave = object.octave || Note.DEFAULT_OCTAVE;
		this.duration = object.duration || Note.DEFAULT_DURATION;
	}
	else{
		throw 'unsupported parameter type for constructor: ' + type; 
	}

	//normalize
	this.letter = this.letter.toUpperCase();
	this.octave *= 1;
	this.duration *= 1;
}


//STATIC VARS
//
Note.DEFAULT_OCTAVE = 4;
Note.DEFAULT_DURATION = 4;
Note.SCALE = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];

//GET METHODS
//
//TODO: rename this method (what are Ab, C, D#, F## called?)
Note.prototype.getSig = function(options) {
	var l = this.letter;
	var a = this.accidental;
	if(this.accidental){
		if(options.asFlat){

		}
		if(options.asSharp){
			if(this.accidental === '#'){
				acc = this.accidental;
			}
			else{

			}
		}		
	}
	return l + a;
}

//MODIFY METHODS
//
Note.prototype.raise = function(options){
	this.octave++;
	return this;
}


module.exports = Note;