// cpu.js
var sys  = require('sys'),
    exec = require('child_process').exec;

var name = process.argv[1]
if (typeof(name) == 'undefined') {
    name = ""
}

var callOpenSsl = function (error, stdout, stderr) {
    sys.print(name + error);
    sys.print(name + stdout);
    sys.print(name + stderr);
    exec("openssl speed blowfish", callOpenSsl)
}

callOpenSsl(null, "", "");
