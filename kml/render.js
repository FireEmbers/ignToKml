var Mustache = require('mustache');
var fs = require('fs');


module.exports = function (coordPath){

  var boundary = Array(coordPath.length);

  for (var i = 0; i < coordPath.length; i++) {

    boundary[i]= coordPath[i][1].toString()+','+coordPath[i][0].toString() +',50' //longitude comes first
    
  };

  var data = {
    boundaryCoordinates: boundary.join('\n'),
  };

  var template = fs.readFileSync(__dirname+'/templateSingle.kml', { encoding: 'utf8' });
  var result = Mustache.render(template, data);
  
  //return kml string
  return result;
}