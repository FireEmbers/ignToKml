var fs = require('fs');
var Mustache = require('mustache');


module.exports = function (coordPath, filename){

  var boundary = Array(coordPath.length);

  for (var i = 0; i < coordPath.length; i++) {

    boundary[i]= coordPath[i][1].toString()+','+coordPath[i][0].toString() +',50' //longitude comes first
    
  };

var data = {
  boundaryCoordinates: boundary.join('\n'),
};

var template = fs.readFileSync('./kml/templateSingle.kml', { encoding: 'utf8' });
var result = Mustache.render(template, data);
fs.writeFileSync(filename, result);

};