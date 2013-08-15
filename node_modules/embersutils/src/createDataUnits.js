/*

Creates data Units.

Returns an array where each element is an array of variables:  
  -moiture: deterministic
  -windSpeed: random
  -windDir: deterministic

*/

module.exports = function( runs, moisture, u, windDir){

    var i;
    var numVar = 3;
    var dataArray = Array(runs);

    for (i = 0; i < runs; i++) {
      dataArray[i] = new Array(numVar);
  }

  //Populate: |moiture|windSpeed|windDir|
  for (i = 0; i < runs; i++) {
    dataArray[i][0] = moisture;
    dataArray[i][1] = gauss(u[0], u[1]/100*u[0]);
    dataArray[i][1] = (dataArray[i][1] >= 0 ? dataArray[i][1] : 0);
    dataArray[i][2] = windDir;
  }

  return dataArray;

};

function gauss(avg, sDev) {

  var boxmuller = require('box-muller');

  //zero mean, unit variance
  var sample = boxmuller()

  //returns random number with gaussian distribution
  //uses box Muller algorithm to compute normal 0-1 distribution

    var gaussNumber = avg + sDev * sample;

  return gaussNumber;
}