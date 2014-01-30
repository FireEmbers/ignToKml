var Mustache = require('mustache');
var fs = require('fs');

module.exports = function (coordPath, lineColour, polyColour, tag){

  var boundary = Array(coordPath.in.length);

  for (var i = 0; i < coordPath.in.length; i++) {
    //longitude comes first
    boundary[i] = coordPath.in[i][1].toString()+','+coordPath.in[i][0].toString() +',50';
  }

  var data = {
    inCoordinates: boundary.join('\n'),
    lineColour: lineColour,
    polyColour: polyColour,
    tag: tag
  };

  //single contour
  var template = '';
  if (typeof coordPath.out === 'undefined') {
    template = fs.readFileSync(__dirname+'/templateSingle.kml', { encoding: 'utf8' });
  }
  else {

    boundary = Array(coordPath.out.length);

    for (i = 0; i < coordPath.out.length; i++) {
      //longitude comes first
      boundary[i]= coordPath.out[i][1].toString()+','+coordPath.out[i][0].toString() +',50';
    }

    data.outCoordinates = boundary.join('\n');
    template = fs.readFileSync(__dirname+'/templateDoughnut.kml', { encoding: 'utf8' });
  }

  var result = Mustache.render(template, data);
  //return kml string
  return result;
};