var createPaths = require('./src/createPaths');
var cconv = require('cconv');
var createKml = require('./kml/render.js');

module.exports = function( opts ){

  var tf = opts.tf;
  var cA = opts.ignPt;
  var rows = opts.rows;
  var cols = opts.cols;
  var height = opts.height;
  var width = opts.width;
  var lineColour = opts.lineColour;
  var polyColour = opts.polyColour;
  var tag = opts.tag;
  var data1 = opts.data1;

  var sridA = 4258;
  var sridB = 3035;
  var cB = cconv(sridA, sridB, cA, true);
  var Easting0 = cB[0] - width/2;
  var Norting0 = cB[1] + height/2;

  //Do path 1 or inside boundary
  var pathRowCol = createPaths(tf, data1, rows, cols);
  var pathEN = Array(pathRowCol.length);
  var pathCoord = Array(pathRowCol.length);
  var deltaH = height/rows;
  var deltaW = width/cols;
  //Create Easting/northing array
  for (var i = 0; i < pathRowCol.length; i++){
    pathEN[i] = [Easting0 +(pathRowCol[i][1] + 0.5)*deltaW, Norting0 - (pathRowCol[i][0] + 0.5)*deltaH ];
  }
  //Project to WGS84
  for (i = 0; i < pathRowCol.length; i++) {
    pathCoord[i] = cconv(sridA, sridB, pathEN[i], false);
  }

  var output = {};
  if ( typeof opts.data2 === 'undefined' ){

    output.path = pathCoord;
    output.kml = createKml({ 'in': pathCoord }, lineColour, polyColour, tag);

  } else {

    var data2 = opts.data2;

    //Do path 2 or outside boundary
    pathRowCol = createPaths(tf, data2, rows, cols);
    pathEN = Array(pathRowCol.length);
    var pathCoord2 = Array(pathRowCol.length);
    deltaH = height/rows;
    deltaW = width/cols;
    //Create Easting/northing array
    for (i = 0; i < pathRowCol.length; i++){
      pathEN[i] = [Easting0 +(pathRowCol[i][1] + 0.5)*deltaW, Norting0 - (pathRowCol[i][0] + 0.5)*deltaH ];
    }
    //Project to WGS84
    for (i = 0; i < pathRowCol.length; i++) {
      pathCoord2[i] = cconv(sridA, sridB, pathEN[i], false);
    }

    var paths = {'in': pathCoord, 'out': pathCoord2};
    output.kml =  createKml(paths, lineColour, polyColour, tag);
  }

  return output;
};