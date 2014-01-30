var ignToKml = require('./../index');
var readIgnMap = require('embersutils').fileToArray;
var fs = require('fs');
var join = require('path').join;

var opts = {
  rows: 300,
  cols: 300,
  height: 4000,
  width: 4000,
  tf: 300,
  ignPt: [41 + 43/ 60 + 16.46/3600,-(8 + 9/60 + 8.36002/3600)],
  lineColour: 'ff0000ff',
  polyColour: 'b30000ff',
  tag: '5hour sim'
};

readIgnMap(join(__dirname,'./exampleData/testDoughnut_1.map'), opts.rows, opts.cols, function (map) {

  opts.data1 = map;
  readIgnMap(join(__dirname,'./exampleData/testDoughnut_2.map'), opts.rows, opts.cols, onMap);
});

function onMap(map2, err){

  opts.data2 = map2;

  var map = ignToKml(opts);

  fs.writeFileSync(join(__dirname,'kmlTestDoughnut.kml'), map.kml, {encoding: 'utf8'});

}







