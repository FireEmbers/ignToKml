var createPaths = require('./createPaths');
var readIgnMap = require('../utils/fileToArray');

var rows = 20;
var cols = 20;

readIgnMap('./../emberTerminal/ign.map', rows, cols, onMap);

function onMap(ignData){

  console.log(createPaths(100, ignData, rows, cols));

}