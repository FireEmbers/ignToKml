//Print map in 2d matrix, doesn't fuck with the data
//no headers

var fs = require('fs');
var util = require('util');

module.exports = function (data, rows, cols, filename) {


  var options = {
    flags: 'w',
    encoding: 'utf8',
    mode: 0666
  };

  var s = fs.createWriteStream(filename, options);

  var row, line, i = 0, flushed;

  function writeRow() {
    if (i++ === rows)
      return s.end();

    row = data.slice(cols*(i-1), cols*i);
    row.unshift(new Array(cols+1).join(' %s').slice(1)+'\n');
    line = util.format.apply(util, row);

    flushed = s.write(line);

    if (flushed) process.nextTick(writeRow);
    else s.once('drain', writeRow);
  }

  writeRow();
};