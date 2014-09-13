var select = require('../');
var test = require('tape');
var through = require('through2');
var tokenize = require('html-tokenize');
var fs = require('fs');


test('loose angle brackets', function (t) {
    t.plan(1);
    var s = select('p.content', function (e) {
    });
    readStream('angles.html').pipe(tokenize()).pipe(s).pipe(through.obj(write, end));
    
    function write (row, enc, next) {
        next();
    }
    function end () { t.ok(true, 'ended'); }
});


function readStream (filename) {
    return fs.createReadStream(__dirname + '/bad_html/' + filename);
}
