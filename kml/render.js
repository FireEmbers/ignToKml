var fs = require('fs');
var Mustache = require('mustache');

var outerBoundaryIsCoordinates = [
  '-77.05788457660967, 38.87253259892824, 100',
  '-77.05465973756702, 38.87291016281703, 100',
  '-77.05315536854791, 38.87053267794386, 100',
  '-77.05552622493516, 38.86875780125600, 100',
  '-77.05844056290393, 38.86996206506943, 100',
  '-77.05788457660967, 38.87253259892824, 100'
];

var innerBoundaryIsCoordinates = [
  '-77.05668055019126, 38.87154239798456, 100',
  '-77.05542625960818, 38.87167890344077, 100',
  '-77.05485125901024, 38.87076535397792, 100',
  '-77.05577677433152, 38.87008686581446, 100',
  '-77.05691162017543, 38.87054446963351, 100',
  '-77.05668055019126, 38.87154239798456, 100'
];

var data = {
  outerBoundaryIsCoordinates: outerBoundaryIsCoordinates.join('\n'),
  innerBoundaryIsCoordinates: innerBoundaryIsCoordinates.join('\n')
};

var template = fs.readFileSync('template.kml', { encoding: 'utf8' });
var result = Mustache.render(template, data);
fs.writeFileSync('result.kml', result);

console.log('Done');
