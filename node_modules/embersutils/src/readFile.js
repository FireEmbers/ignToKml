/*
  Reads any file using readfile from 'fs' module

*/

module.exports = function (fileName, cb) {

  var fs = require('fs');

  fs.readFile (fileName, {encoding: 'utf8'}, 'r' ,onFileRead);

  function onFileRead(err,data){

    if (err) throw err;

    cb(data);
  }

};