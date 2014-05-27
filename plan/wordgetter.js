function createWordgetter() {
  var settings = {
    socials: [
      'close13',
      'domain1',
      'facebook24',
      'facebook30',
      'like3',
      'link8',
      'multiple25',
      'phone16',
      'plate7',
      'social19',
      'users6',
      'youtube7',
    ],
    tecmologies: [
      'apple',
      'cloud32',
      'dark20',
      'download5',
      'men14',
      'salutation',
      'sea1',
      'seo1',
      'users6',
    ],
    solutions: [
      'ascendant6',
      'bars11',
      'briefcase13',
      'gears3',
      'head21',
      'light59',
      'person25',
      'seo15'
    ]
  };

  function getSocial() {
    return pickFromArrayAtRandom(settings.socials);
  }

  function getTecmologies(number, done) {
    var tecmologies = [];
    for (var i = 0; i < number; ++i) {
      tecmologies.push(pickFromArrayAtRandom(settings.tecmologies));
    }
    return tecmologies;
  }

  function getSolutions(number, done) {
    var solutions = [];
    for (var i = 0; i < number; ++i) {
      solutions.push(pickFromArrayAtRandom(settings.solutions));
    }
    return solutions;
  }

  function pickFromArrayAtRandom(array) {
    return array[~~(Math.random() * array.length)];
  }

  return {
    getSocial: getSocial,
    getTecmologies: getTecmologies,
    getSolutions: getSolutions
  };
}
