#Note Object

##TODO:

- set pitch, set duration (tests first, then implementation)

- integrate into composer (add dot notation!)

- add things like frequency: consider separate packages when you have a concrete example such as alternate tuning

>> work on composer: playing multiple notes

- docment: autodocumentation?
- publish package

- code coverage and other badges?

- custom formats/mapping (e.g. new Note('Ab-6-12', 'N#-o-d'), new Note({ l: 'A'}, { length: 'l'}))


##Quick Start

###Create a Note
var Note = require('@jag82/note');

var note = new Note('Ab7.16');

var note = new Note({ letter: 'A', accidental: 'b', octave: 7, duration: 16 });
var note = new Note({ letter: 'Ab', octave: 7, duration: 16 });


###Modify a Note


###Other functions