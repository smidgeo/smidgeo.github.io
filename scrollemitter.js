function createScrollEmitter() {

var scrollEmitter = {
  elementsToWatch: [],
  viewTop: 0,
  viewBottom: 0
};

scrollEmitter.init = function init() {
  window.onscroll = this.respondToScroll.bind(this);
};

scrollEmitter.watchElementsWithSelectors = 
function watchElementsWithSelectors(selectors) {
  this.elementsToWatch = selectors.map(document.querySelector.bind(document));
};

scrollEmitter.respondToScroll = function respondToScroll() {
  this.viewTop = document.body.scrollTop;
  this.viewBottom = this.viewTop + window.innerHeight;

  this.elementsToWatch.forEach(this.emitIfCenterOfElIsVisible.bind(this));
};

scrollEmitter.emitIfCenterOfElIsVisible = 
function emitIfCenterOfElIsVisible(el) {
  var center = el.offsetTop + el.offsetHeight/2;
  // console.log('Center is visible', center > this.viewTop && center < this.viewBottom);
  if (center > this.viewTop && center < this.viewBottom) {
    var visibleEvent = new CustomEvent('elCenterIsInView', {detail: el});
    document.dispatchEvent(visibleEvent);    
  }
};

scrollEmitter.init();

return scrollEmitter;
}
