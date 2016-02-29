// medium-cpu.js -- Computes factorial in a tight loop using Continuation Passing Style
//                  Also does some extra work before each multiplication step.
var sys  = require('sys');

// workFactor = 1000 gets about 50% CPU usage on a single core, on an i7-5600U CPU @ 2.60GHz
var workFactor = parseInt(process.env.WORK_FACTOR) || 1000;

var eq = function(x, y, cb) {
    if (x == y) {
        cb(true);
    } else {
        cb(false);
    }
};

var add = function(x, y, cb) {
    cb(x + y);
};

var mult = function(x, y, cb) {
    cb(x * y);
};

var wackyFact = function(n, cb) {
    eq(n, 0, function(b) {
        if (b) {
            cb(1);
        } else {
            add(n, -1, function(m) {
                wackyFact(m, function(f) {
                    mult(n, f, function(r) {
                        // Do some extra work before returning.
                        var j = r;
                        for (var i = 0; i < workFactor; i++) {
                            if (i % 2) {
                                j = Math.sqrt(j);
                            } else {
                                j = Math.pow(r, 1/1023);
                            }
                        }
                        cb(r);
                    });
                });
            });
        }
    });
};

var cb = function(x) {
    setTimeout(function() {
        wackyFact(170, cb);
    }, 0);
};

wackyFact(170, cb);
