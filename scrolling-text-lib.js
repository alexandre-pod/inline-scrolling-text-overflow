var ScrollingTextLib = {};

(function(ScrollingTextLib) {
  ScrollingTextLib.add = addScrollingText;
  ScrollingTextLib.remove = removeScrollingText;
  ScrollingTextLib.disable = disable;
  ScrollingTextLib.enable = enable;

  // internal variables
  var lastId = 0;
  var watchedElements = {};

  var enabled = true;

  // listen resize event to update container size, add a delay of 1s before updating all wathced elements on resize
  window.addEventListener('resize', _defer(_updateAll, 1000));

  // Add class to the element, set the css variable coresponding to the width of the parent element needed for the animation
  // If the element was already added to the lib, it will be updated
  function addScrollingText(textElement) {
    if (textElement === null) {
      return console.error("The element cannot be null");
    }
    // If the element is not in the DOM, we wait its insertion
    if (!_isInDOM(textElement)) {
      _whenInDOM(textElement, function() {
        addScrollingText(textElement);
      });
      return;
    }
    if (textElement.parentElement === null) {
      return console.error("The element needs to have a parent");
    }
    if (textElement._stlid !== undefined) {
      _updateCssVariable(textElement);
      textElement.classList.remove('stl-scrolling-text');
      if(enabled) textElement.classList.add('stl-scrolling-text');
      return;
    }

    var id = lastId++;
    watchedElements[id] = textElement;
    textElement._stlid = id;

    _updateCssVariable(textElement);
    if(enabled) textElement.classList.add('stl-scrolling-text');
    textElement.parentElement.classList.add('stl-scrolling-text-container');
  }

  function removeScrollingText(textElement) {
    if(textElement._stlid) {
      watchedElements[textElement._stlid].classList.remove('stl-scrolling-text');
        if (watchedElements[textElement._stlid].parentElement) {
          watchedElements[textElement._stlid].parentElement.classList.remove('stl-scrolling-text-container');
        }
        delete watchedElements[textElement._stlid];
    }
  }

  function _updateCssVariable(textElement) {
    textElement.parentElement.style.setProperty('--stl-container-size', textElement.parentElement.clientWidth + 'px');
  }

  function _updateAll() {
    if(!enabled) return;
    var toRemove = [];
    for (var id in watchedElements) {
      var textElement = watchedElements[id];
      textElement.classList.remove('stl-scrolling-text');
      if (_isInDOM(textElement)) {
        _updateCssVariable(textElement);
        textElement.classList.add('stl-scrolling-text');
      } else {
        // If the element is no longer in the DOM, we remove it
        toRemove.push(id);
      }
    }
    // remove old elements
    for (var i=0 ; i<toRemove.length ; i++) {
      delete watchedElements[toRemove[i]];
    }
  }

  function _isInDOM(element) {
    while(element !== null && element != document.body) {
      element = element.parentElement;
    }
    return element !== null;
  }

  function _whenInDOM(element, callback) {
    var intervalId = setInterval(function() {
      if(_isInDOM(element)) {
        clearInterval(intervalId);
        callback();
      }
    }, 500);
  }

  function _defer(callback, delay) {
    var timeoutId;
    return function() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(callback, delay);
    };
  }

  function enable() {
    enabled = true;
    _updateAll();
  }

  function disable() {
    enabled = false;
    for (var key in watchedElements) {
      watchedElements[key].classList.remove('stl-scrolling-text');
    }
  }

})(ScrollingTextLib);
