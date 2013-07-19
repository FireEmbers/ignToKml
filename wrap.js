var createPaths = require('./createPaths');
var readIgnMap = require('../utils/fileToArray');
var cconv = require('cconv');
var printKml = require('./kml/render.js');

var rows = 1024;
var cols = 1024;

var height = 4000;
var width = 4000;

var tf= 3000;

var coord = {lat:[41,43,16.46],lon:[ 8,9,8.36002]};

var deltaH = height/rows;
var deltaW = width/cols;

var cA = [ coord['lat'][0] + coord['lat'][1] / 60 + coord['lat'][2] /3600, -
(coord['lon'][0] +  coord['lon'][1] / 60 + coord['lon'][2]/3600)];

var sridA = 4258;
var sridB = 3035;
cB = cconv(sridA, sridB, cA, true);

var Easting0 = cB[0] - width/2;
var Norting0 = cB[1] + height/2;

readIgnMap('./testData/ignLean16_Sc0_1024.dat', rows, cols, onMap);

function onMap(ignData){

  var pathRowCol = createPaths(tf, ignData, rows, cols);

  console.log(pathRowCol);

  var pathEN = Array(pathRowCol.length);

  var pathCoord = Array(pathRowCol.length);

  //Create Easting/northing array
  for (var i = 0; i < pathRowCol.length; i++){
    pathEN[i] = [Easting0 +(pathRowCol[i][1] + 0.5)*deltaW, Norting0 - (pathRowCol[i][0] + 0.5)*deltaH ];
  }

  //Project to WGS84
  for (var i = 0; i < pathRowCol.length; i++)
    pathCoord[i] = cconv(sridA, sridB, pathEN[i], false);

  printKml(pathCoord, './results_' + tf +'.kml');


}