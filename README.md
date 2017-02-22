#Note Object

##Quick Start

###Create a Note

See `tests/` for usage.

```
var Note = require('@jag82/note');
```

```
//format = letter[octave][_length]
var note = new Note('Ab7_16');
```

```
var note = new Note({ letter: 'A', accidental: 'b', octave: 7, duration: 16 });
var note = new Note({ letter: 'Ab', octave: 7, duration: 16 });
```

```
//chromatic value from 1-12 representing notes C-B
var note = new Note({ chromatic: 10, octave: 4, duration: 4});
```


###Modify a Note

```
var Note = require('@jag82/note');

var note = new Note('C#3_2');	//C#, octave 3, half note
console.log(note.getSig());		//prints C#
console.log(note.octave);		//prints 3
console.log(note.duration);		//prints 2

note.raise();
console.log(note.getSig());		//prints D

note.lower();
console.log(note.getSig());		//prints C#

note.lengthen();
console.log(note.duration);		//prints 4

note.shorten();
console.log(note.duration);		//prints 2

```


###Conversions
```
var Note = require('@jag82/note');

var note = new Note('C4_4');

var obj = note.toObject();		// { chromatic: 1, octave: 4, duration: 4 }

var str = note.toString();		// "C4_4"
```


###Rests
```
var Note = require('@jag82/note');

var rest = Note.createRest(4);	// quarter-rest

var obj = note.toObject();		// { duration: 4 }

var str = note.toString();		// X_4

rest.raise();	//no effect
rest.lower();	//no effect

rest.lengthen(); //works
rest.shorten(); //works

```


##TODO:

- add frequency (as separate package since it's reusable by things like web-audio-player)?

- auto-documentation

- code coverage / badges?

- custom formats/mapping (e.g. new Note('Ab-6-12', 'N#-o-d'), new Note({ l: 'A'}, { length: 'l'}))

