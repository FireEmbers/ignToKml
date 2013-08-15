//Prints to a file

module.exports = function (stuffToPrint, filename) {
  var fs = require('fs');
  var util = require('util');

  var options = {
    flags: 'w',
    encoding: 'utf8',
    mode: 0666
  };

  var s = fs.createWriteStream(filename, options);

  s.write(stuffToPrint);
};