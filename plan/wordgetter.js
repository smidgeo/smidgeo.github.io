function createWordgetter() {
  var settings = {
    socials: [
      '&#xE005', // close13
      '&#xE008', // domain1
      '&#xE00a', // facebook24
      '&#xE00b', // facebook30
      '&#xE00f', // like3
      '&#xE010', // link8
      '&#xE012', // multiple25
      '&#xE014', // phone16
      '&#xE015', // plate7
      '&#xE01a', // social19
      '&#xE01b', // users6
      '&#xE01c' // youtube7
    ],
    tecmologies: [
      '&#xE000', // apple
      '&#xE006', // cloud32
      '&#xE007', // dark20
      '&#xE009', // download5
      '&#xE011', // men14
      '&#xE016', // salutation
      '&#xE017', // sea1
      '&#xE018', // seo1
      '&#xE01b' // users6
    ],
    solutions: [
      '&#xE001', // ascendant6
      // '&#xE002', // bag1
      '&#xE003', // bars11
      '&#xE004', // briefcase13
      '&#xE00c', // gears3
      '&#xE00d', // head21
      '&#xE00e', // light59
      '&#xE013', // person25
      // '&#xE015', // plate7
      '&#xE019' // seo15    
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
