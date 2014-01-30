var ignToKml = require('./../index');
var readIgnMap = require('embersutils').fileToArray;
var fs = require('fs');
var join = require('path').join;

var opts = {
  rows: 1024,
  cols: 1024,
  height: 4000,
  width: 4000,
  tf: 300,
  ignPt: [41 + 43/ 60 + 16.46/3600,-(8 + 9/60 + 8.36002/3600)],
  lineColour: 'ff0000ff',
  polyColour: 'b30000ff',
  tag: '5hour sim'
};

readIgnMap(join(__dirname,'./exampleData/ignLean16_Sc3_1024.dat'), opts.rows, opts.cols, onMap);

function onMap(ignData){

  opts.data1 = ignData;

  var maps = ignToKml( opts);

  fs.writeFileSync(join(__dirname,'kmlTest.kml'), maps['kml'], {encoding: 'utf8'});

  var file = fs.createWriteStream(join(__dirname,'pathCoordinates.dat'));
  file.on('error', function(err){
    return console.log('Error on writing path coordinates file');
  });
  maps['path'].forEach( function(v){
    file.write(v.join(',')+'\n');
  });
  file.end();

}







