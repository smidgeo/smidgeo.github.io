(function init() {
  var scrollEmitter = createScrollEmitter();
  scrollEmitter.watchElementsWithSelectors(
    ['.get-one', '.get-two', '.get-three']
  );

  document.addEventListener('elCenterIsInView', function onElVisible(e) {
    console.log(e.detail, 'is visible.');
  });

})();
