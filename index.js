var createPaths = require('./src/createPaths');
var cconv = require('cconv');
var createKml = require('./kml/render.js');

module.exports = function( ignData, tf, cA, rows, cols, height, width){

  var pathRowCol = createPaths(tf, ignData, rows, cols);


  var pathEN = Array(pathRowCol.length);

  var pathCoord = Array(pathRowCol.length);

  var deltaH = height/rows;
  var deltaW = width/cols;

  var sridA = 4258;
  var sridB = 3035;
  var cB = cconv(sridA, sridB, cA, true);

  var Easting0 = cB[0] - width/2;
  var Norting0 = cB[1] + height/2;

  //Create Easting/northing array
  for (var i = 0; i < pathRowCol.length; i++){
    pathEN[i] = [Easting0 +(pathRowCol[i][1] + 0.5)*deltaW, Norting0 - (pathRowCol[i][0] + 0.5)*deltaH ];
  }

  //Project to WGS84
  for (var i = 0; i < pathRowCol.length; i++)
    pathCoord[i] = cconv(sridA, sridB, pathEN[i], false);

  return { 'path': pathCoord,'kml': createKml(pathCoord)};

}