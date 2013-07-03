var fs = require('fs');
var Mustache = require('mustache');


module.exports = function (coordPath){

  var boundary = Array(coordPath.length);

  for (var i = 0; i < coordPath.length; i++) {

    boundary[i]= coordPath[i][0].toString()+','+coordPath[i][1].toString() +',36'
    
  };

var data = {
  boundaryCoordinates: boundary.join('\n'),
};

var template = fs.readFileSync('./kml/templateSingle.kml', { encoding: 'utf8' });
var result = Mustache.render(template, data);
fs.writeFileSync('./result.kml', result);

};