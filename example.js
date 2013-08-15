var ignToKml = require('./index');
var readIgnMap = require('embersutils').fileToArray;

var rows = 1024;
var cols = 1024;

var height = 4000;
var width = 4000;

var tf= 120;

var ignPt = [41 + 43/ 60 + 16.46/3600,-(8 + 9/60 + 8.36002/3600)];


readIgnMap('./exampleData/ignLean16_Sc3_1024.dat', rows, cols, onMap);

function onMap(ignData){

  filename = './testResults_' + tf +'.kml'

  ignToKml( ignData, filename, tf, ignPt, rows, cols, height, width);

}







