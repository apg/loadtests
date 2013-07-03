// io.js
var pg = require('pg');
var LOOP_DELAY = process.env.LOOP_DELAY || 100;

var do_io = function () {
  pg.connect(process.env.DATABASE_URL, function(err, client) {
    if(!err) {
      var query = client.query('SELECT pg_sleep(0.25)');
    }
  });
  setTimeout(do_io, LOOP_DELAY);
};

do_io();

