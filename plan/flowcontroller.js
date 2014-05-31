function flowController(opts) {
  var mover = createMover();
  var wordgetter = createWordgetter();

  var readerBox = d3.select('#reader');
  var parserBox = d3.select('#parser');
  var rendererBox = d3.select('#renderer');

  var gravitybox = createGravityBox({
    root: d3.select('#block-layer'),
    width: 800,
    height: 1020,
    r: 25,
    nodeClass: 'tagbox',
    nodeElementName: 'text',
    xAttr: 'x',
    yAttr: 'y',
    processSelection: function setText() {
      d3.select(this).text('$');
    },
    rectRecoilFactor: 3.0
  });

  function moveWordIntoParserBox(word, source, done) {
    mover.moveConceptAlongCurve({
      concept: word,
      textClass: 'moving-concept',
      layer: d3.select('#chunk-layer'),
      source: source,
      target: {
        x: +parserBox.attr('x') - parserBox.attr('width') * 0.2,
        y: +parserBox.attr('y') + parserBox.attr('height') * 1.2
      },
      duration: 1500,
      ease: d3.ease('linear'),
      done: done
    });
  }

  function addBlock() {
    gravitybox.add([
      {
        x: +rendererBox.attr('x') + rendererBox.attr('width') * 0.7,
        y: +rendererBox.attr('y') + 1.8 * rendererBox.attr('height'),
        width: 72,
        height: 30,
        attrs: {
          width: 72,
          height: 30,
          fill: '#666'
        }
      }
    ]);
    gravitybox.render();
  }

  function tokenToBlock(token) {
    var block = addBlock();
    token.remove();

    return block;
  }

  function moveWordFromReaderToParser(theWord) {

    var readerBoxCenter = {
      x: +readerBox.attr('x') + readerBox.attr('width')/2,
      y: +readerBox.attr('y') + readerBox.attr('height')/2
    };

    moveWordIntoParserBox(theWord, readerBoxCenter, next);

    function next(wordRendition) {
      wordRendition.remove();
      var solutions = wordgetter.getSolutions(~~(Math.random() * 15));
      solutions.forEach(moveLetterFromParserBoxToRendererBox);
    }
  }

  function moveLetterFromParserBoxToRendererBox(letter, i) {
    mover.moveConceptAlongCurve({
      concept: letter,
      textClass: 'moving-concept',
      layer: d3.select('#chunk-layer'),
      source: {
        x: +parserBox.attr('x') + -0.1 * parserBox.attr('width') + i * 10,
        y: +parserBox.attr('y') + 1.5 * parserBox.attr('height') - i * 12
      },
      target: {
        x: +rendererBox.attr('x') + rendererBox.attr('width')/2 + i * 10,
        y: +rendererBox.attr('y') + 1.0 * rendererBox.attr('height') - i * 15
      },
      delay: 150 * i,
      done: function letterMoved(letterRendition) {
        tokenToBlock(letterRendition);
      }
    });
  }
  
  function addWords(words) {
    var wordsAdded = 0;

    function addWord() {
      moveWordFromReaderToParser(words[wordsAdded]);
      wordsAdded += 1;
      if (wordsAdded >= words.length) {
        clearInterval(wordIntervalKey);
      }
    }

    addWord();
    var wordIntervalKey = setInterval(addWord, 4000);
  }

  function startMotion() {
    var internetResponses = 0;
    function renderInternetResponse() {
      var boxCenterX = +readerBox.attr('x') + readerBox.attr('width')/2;
      mover.moveConceptAlongCurve({
        concept: wordgetter.getSocial(),
        textClass: 'moving-concept',
        layer: d3.select('#chunk-layer'),
        source: {
          x: 900,
          y: 50
        },
        target: {
          x: boxCenterX,
          y: +readerBox.attr('y') + +readerBox.attr('height')/2
        },
        duration: 3500,
        done: function getWords() {
          addWords(wordgetter.getTecmologies(1));
        }
      });

      internetResponses += 1;
      if (internetResponses > 50) {
        clearInterval(internetKey);
      }
    }
    renderInternetResponse();
    var internetKey = setInterval(renderInternetResponse, 5000);
  }

  function anyPartIsShowing(viewTop, viewBottom, el) {
    var topThreshold = 0;
    var bottomThreshold = el.offsetTop + el.offsetHeight;
    return !(bottomThreshold < viewTop || topThreshold > viewBottom);
  }
  
  ((function watchForScrollIntoView() {
    function onElCenterInView(e) {
      document.removeEventListener('elMovedIntoView', onElCenterInView);
      startMotion();
    }

    var scrollWatcher = createScrollWatcher();
    scrollWatcher.watchElements(
      [
        {
          selector: '#stream-overload-diagram',
          isInViewFunction: anyPartIsShowing
        }
      ]
    );

    document.addEventListener('elMovedIntoView', onElCenterInView);
  })());

  ((function scaleOuterLayer() {
    var clientWidth = document.body.clientWidth;
    var scale = 1.0;
    if (clientWidth < 800) {
      scale = clientWidth/800;
      d3.select('#outer-layer')
        .attr('transform', 'translate(0, 0) scale(' + scale + ')');
    }
  })());

  return {
  };
}

var theFlowController = flowController({
  chunkLayer: d3.select('#chunk-layer'),
  blockLayer: d3.select('#block-layer')
});
