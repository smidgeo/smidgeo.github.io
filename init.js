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

  function elIsInView(viewTop, viewBottom, el) {
    var topThreshold = el.offsetTop + el.offsetHeight * 0.33;
    var bottomThreshold = el.offsetTop + el.offsetHeight * 0.67;
    return !(bottomThreshold < viewTop || topThreshold > viewBottom);
  }

  var scrollEmitter = createScrollWatcher();
  scrollEmitter.watchElements(
    [
      {
        selector: '.get-one', 
        isInViewFunction: elIsInView
      },
      {
        selector: '.get-two', 
        isInViewFunction: elIsInView
      },
      {
        selector: '.get-three', 
        isInViewFunction: elIsInView
      },
      {
        selector: '.get-final', 
        isInViewFunction: elIsInView
      }
    ]
  );

  document.addEventListener('elMovedIntoView', 
    function onElCenterInView(e) {
      e.detail.classList.add('in-spotlight');
    }
  );

  // Initial sync of what's in-view and the in-spotlight class.
  scrollEmitter.respondToScroll();

})();
