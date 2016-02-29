// fork.js
var sys  = require('sys'),
    fork = require('child_process').fork;

if (process.argv[2] == undefined) {
    console.log("need a file to fork");
    process.exit(1);
}

var concurrency = parseInt(process.env.CONCURRENCY);
if (isNaN(concurrency)) {
    concurrency = 1;
}

for (var i=1; i <= concurrency; i++) {
    fork(__dirname + '/' + process.argv[2], ["fork-" + i + ": "]);
}
