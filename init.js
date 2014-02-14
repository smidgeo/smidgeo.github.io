(function init() {
  var scrollEmitter = createScrollEmitter();
  scrollEmitter.watchElementsWithSelectors(
    ['.get-one', '.get-two', '.get-three']
  );

  document.addEventListener('elCenterMovedIntoView', 
    function onElCenterInView(e) {
      console.log(e.detail, '\'s center is visible.');
    }
  );

  document.addEventListener('elCenterMovedOutOfView', 
    function onElCenterOutOfView(e) {
      console.log(e.detail, '\'s center is not visible.');
    }
  );
})();
