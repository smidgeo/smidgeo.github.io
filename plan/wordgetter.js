function createWordgetter() {
  var settings = {
    fallbackObjects: [
      'Ideas',
      'User-Generated Contents (UGC)',
      'Eyeballs (EBLS)',
      'Clickthrus',
      'Brand Identitie',
      'Big Data (BD)',
      'Engagmint (E)'
    ],
    socials: [
      'Twitter',
      'Facebok',
      'Web 3.0',
      'SEO',
      'Digital Blogs',
      'Googles\' Glass',
      'Xbone Live'
    ]
  };

  function getResource(number, done) {
    return pickFromArrayAtRandom(settings.fallbackObjects);
  }

  function getSocial() {
    return pickFromArrayAtRandom(settings.socials);
  }

  function pickFromArrayAtRandom(array) {
    return array[~~(Math.random() * array.length)];
  }

  return {
    getSocial: getSocial,
    getResource: getResource
  };
}
