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

  var scrollEmitter = createScrollWatcher();
  scrollEmitter.watchElementsWithSelectors(
    ['.get-one', '.get-two', '.get-three', '.get-final']
  );

  document.addEventListener('elCenterMovedIntoView', 
    function onElCenterInView(e) {
      e.detail.classList.add('in-spotlight');
    }
  );

  // Initial sync of what's in-view and the in-spotlight class.
  scrollEmitter.respondToScroll();

})();
