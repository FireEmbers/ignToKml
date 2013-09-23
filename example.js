var ignToKml = require('./index');
var readIgnMap = require('embersutils').fileToArray;
var fs = require('fs');

var rows = 1024;
var cols = 1024;

var height = 4000;
var width = 4000;

var tf= 120;

var ignPt = [41 + 43/ 60 + 16.46/3600,-(8 + 9/60 + 8.36002/3600)];


readIgnMap('./exampleData/ignLean16_Sc3_1024.dat', rows, cols, onMap);

function onMap(ignData){

  var maps = ignToKml( ignData, tf, ignPt, rows, cols, height, width);

  fs.writeFileSync('./kmlTest.kml', maps['kml'], {encoding: 'utf8'});

  var file = fs.createWriteStream('./pathCoordinates.dat');
  file.on('error', function(err){ 
    return console.log('Error on writing path coordinates file')
  });
  maps['path'].forEach( function(v){
    file.write(v.join(',')+'\n');
  });
  file.end();

}







