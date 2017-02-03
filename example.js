var Note = require('./note.js');

var n = new Note();
n.raise();

console.log(JSON.stringify(n));
console.log(n.octave);