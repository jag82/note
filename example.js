var Note = require('./note.js');

var n = new Note('C4');
n.raise();

console.log(JSON.stringify(n));
console.log(n.octave);