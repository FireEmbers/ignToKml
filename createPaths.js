/*

  computes row and column indexes of the fire contour
  this is a countor algorithm similar to the one found in

  http://www.imageprocessingplace.com/downloads_V3/root_downloads/tutorials/contour_tracing_Abeer_George_Ghuneim/ray.html


*/

module.exports = function (tf, ignMap, rows, cols){

  var col, row;
  var rowmin, colmin;

  var pathArray = [];

  var pathHeadRow, pathHeadCol;

                       //S  SE E  NE   N  NW   W   SW 
  var nColArray =      [ 0, 1, 1,  1,  0, -1, -1, -1];
  var nRowArray =      [ 1, 1, 0, -1, -1, -1,  0,  1];
  var backTraceArray = [ 6, 6, 0, 0, 2, 2, 4, 4];

  var tmin = 999999999;

  //find the path head, which is the fisrt cell to be <= of forecast time
  var head = findHead();

  pathHeadRow = head[0];
  pathHeadCol = head[1];

  pathArray.push([pathHeadRow,pathHeadCol]);

  function findHead(){
    for (row = 0; row < rows; row++) {
      for (col = 0; col < cols; col++) {
        if (ignMap[col + row*cols] <= tf)
          return [row,col];
      }
    }
  }

  //Path head 
  row = pathHeadRow;
  col = pathHeadCol;

  //Build Path
  var nBacktrace = 0;

  var tomates = 10000
  while (tomates--){

    n = nBacktrace;

    for (i = 0; i < nColArray.length; i++){

      ncol = col + nColArray[n];
      nrow = row + nRowArray[n];
      ncell = ncol + nrow*cols;

      //Check if neighbour is inbound and not an inner cell
      if ( !(nrow >= 0 && nrow < rows && ncol >= 0 && ncol < cols) ){
        //everytime a cell is skiped, the n index also needs to be incremented
        n++;
        if (n > 7) n = 0;

        continue;
      }

      if (ignMap[ncell] <= tf){


        nBacktrace = backTraceArray[n];

        pathArray.push([nrow,ncol]);

        break;

      }

      n++;
      if (n > 7) n = 0;
    }

    
    col = ncol;
    row = nrow;

    if (row === pathHeadRow && col ===pathHeadCol){
        break;
    }


  }

  return (pathArray);

};
