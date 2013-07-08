// fork.js
var sys  = require('sys'),
    fork = require('child_process').fork;

var concurrency = parseInt(process.env.CONCURRENCY);
if (isNaN(concurrency)) {
    concurrency = 1;
}

for (var i=1; i <= concurrency; i++) {
    fork(__dirname + '/cpu.js', ["fork-" + i + ": "]);
}
