function createScrollWatcher() {

var scrollWatcher = {
  elementsToWatch: [],
  elementLastVisibleStates: [],
  viewTop: 0,
  viewBottom: 0
};

scrollWatcher.init = function init() {
  window.onscroll = this.respondToScroll.bind(this);
};

scrollWatcher.watchElementsWithSelectors = 
function watchElementsWithSelectors(selectors) {
  this.elementsToWatch = selectors.map(document.querySelector.bind(document));
  this.elementLastVisibleStates = selectors.map(
    function alwaysFalse() { return false; });
};

scrollWatcher.respondToScroll = function respondToScroll() {
  this.viewTop = document.body.scrollTop;
  this.viewBottom = this.viewTop + window.innerHeight;

  this.elementsToWatch.forEach(this.emitIfCenterOfElIsVisible.bind(this));
};

scrollWatcher.emitIfCenterOfElIsVisible = 
function emitIfCenterOfElIsVisible(el) {
  var center = el.offsetTop + el.offsetHeight/2;
  
  var elIndex = this.elementsToWatch.indexOf(el);
  var centerIsVisible = (center > this.viewTop && center < this.viewBottom);
  var centerWasVisible = this.elementLastVisibleStates[elIndex];

  if (centerIsVisible && !centerWasVisible) {
    var visibleEvent = new CustomEvent('elCenterMovedIntoView', {detail: el});
    document.dispatchEvent(visibleEvent);
  }
  else if (!centerIsVisible && centerWasVisible) {
    var notVisibleEvent = new CustomEvent('elCenterMovedOutOfView', {detail: el});
    document.dispatchEvent(notVisibleEvent);
  }

  this.elementLastVisibleStates[elIndex] = centerIsVisible;
};

scrollWatcher.init();

return scrollWatcher;
}
