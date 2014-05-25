function flowController(opts) {
  var mover = createMover();
  var wordgetter = createWordgetter();

  var readerBox = d3.select('#reader');
  var parserBox = d3.select('#parser');
  var rendererBox = d3.select('#renderer');

  var gravitybox = createGravityBox({
    root: d3.select('#block-layer'),
    width: 800,
    height: 620,
    r: 25,
    nodeClass: 'tagbox',
    nodeElementName: 'text',
    xAttr: 'x',
    yAttr: 'y',
    processSelection: function setText() {
      d3.select(this).text('$');
    }
  });

  function moveWordIntoParserBox(word, source, done) {
    mover.moveTextAlongCurve({
      text: word,
      layer: d3.select('#chunk-layer'),
      source: source,
      target: {
        x: +parserBox.attr('x') + parserBox.attr('width')/2,
        y: +parserBox.attr('y') + parserBox.attr('height')/2
      },
      duration: 1500,
      ease: d3.ease('linear'),
      done: done
    });
  }

  function breakWordIntoTokens(word) {
    function renderChar(char) {
      return opts.chunkLayer.append('text')
        .text(char)
        .attr({
          x: wordX,
          y: wordY
        });
    }

    var wordText = word.text();
    var wordX = word.attr('x');
    var wordY = word.attr('y');

    word.remove();
    return wordText.split('').map(renderChar);
  }

  function addBlock() {
    gravitybox.add([
      {
        x: +rendererBox.attr('x') + 20,
        y: +rendererBox.attr('y') + 0.6 * rendererBox.attr('height'),
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
      var letters = theWord.split('');
      letters.forEach(moveLetterFromParserBoxToRendererBox);
    }
  }

  function moveLetterFromParserBoxToRendererBox(letter, i) {
    mover.moveTextAlongCurve({
      text: letter,
      layer: d3.select('#chunk-layer'),
      source: {
        x: +parserBox.attr('x') + 0.8 * parserBox.attr('width') + i * 10,
        y: +parserBox.attr('y') + 1.1 * parserBox.attr('height') - i * 15
      },
      target: {
        x: +rendererBox.attr('x') + rendererBox.attr('width')/4 + i * 10,
        y: +rendererBox.attr('y') + 0.8 * rendererBox.attr('height') - i * 15
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
      mover.moveTextAlongCurve({
        text: wordgetter.getSocial(),
        layer: d3.select('#chunk-layer'),
        source: {
          x: boxCenterX - 200,
          y: 700
        },
        target: {
          x: boxCenterX - 100,
          y: +readerBox.attr('y') + +readerBox.attr('height')/2
        },
        duration: 3500,
        done: function getWords() {
          addWords([wordgetter.getResource(), wordgetter.getResource()]);
        }
      });

      internetResponses += 1;
      if (internetResponses > 10) {
        clearInterval(internetKey);
      }
    }
    renderInternetResponse();
    var internetKey = setInterval(renderInternetResponse, 5000);
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
          selector: '#stream-overload-diagram'
        }
      ]
    );

    document.addEventListener('elMovedIntoView', onElCenterInView);
  })());

  return {
  };
}

var theFlowController = flowController({
  chunkLayer: d3.select('#chunk-layer'),
  blockLayer: d3.select('#block-layer')
});
