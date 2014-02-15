(function init() {

  NodeList.prototype.forEach = function nodeListEach(callback, thisArg) {
    for (var i = 0; i < this.length; ++i) {
      var value = this[i];
      if (thisArg) {
        callback.bind(thisArg)(value, i, this);
      }
      else {
        callback(value, i, this);
      }
    }
  };

  var scrollEmitter = createScrollEmitter();
  scrollEmitter.watchElementsWithSelectors(
    ['.get-one', '.get-two', '.get-three', '.get-final']
  );

  document.addEventListener('elCenterMovedIntoView', 
    function onElCenterInView(e) {
      e.detail.classList.add('in-spotlight');
      document.querySelectorAll('.get').forEach(function removeSpotlight(el) {
        if (el !== e.detail) {
          el.classList.remove('in-spotlight');
        }
      });

      console.log(e.detail, '\'s center is visible.');
    }
  );

  // Initial sync of what's in-view and the in-spotlight class.
  scrollEmitter.respondToScroll();

})();
