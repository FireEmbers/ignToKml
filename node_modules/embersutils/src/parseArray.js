module.exports = function (data, rows, cols) {

    /*
      receives array in json and returns a float array
    */


    //removes grass file header
    var dataString = data.match(/[\d.]+/g);

    var array = Array(cols*rows);

    for (var cell = 0; cell < cols * rows; cell++)
      array[cell] = parseFloat(dataString[cell]);

    return array;
  }