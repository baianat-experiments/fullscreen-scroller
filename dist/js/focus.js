(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Focus = factory());
}(this, (function () { 'use strict';

/**
 * Utilities
 */
function select(element) {
  if (typeof element === 'string') {
    return document.querySelector(element);
  }
  return element;
}





function getAverage(array, length) {
  var sum = 0;
  var elements = array.slice(Math.max(array.length - length, 1));
  elements.forEach(function (value) { return sum = sum + value; });
  return Math.ceil(sum / length);
}

function getArray(length, value) {
  return new Array(length).fill(value);
}

var Focus = function Focus(selector, settings) {
  this.el = select(selector);
  this.settings = settings;
  this.init();
};

Focus.prototype.init = function init () {
  this.sections      = Array.from(this.el.querySelectorAll('.section'));
  this.currentSection= 0;
  this.slidesCount   = this.getSlidesCount();
  this.currentSlides = getArray(this.sections.length, 0);
  this.isSliding     = false;
  this.scrollingValues = [];

  this.initDots();
  this.initKeyboard();
  this.initScroll();
  this.goToSection(0);
};

Focus.prototype.initDots = function initDots () {
    var this$1 = this;

  this.fragment = document.createDocumentFragment();
  var focusNav = document.createElement('ul');
  focusNav.classList.add('focus-nav');
  focusNav.insertAdjacentHTML('afterbegin',
    '<li><a class="focus-dot"></a></il>'.repeat(this.sections.length)
  );
  this.fragment.appendChild(focusNav);
  document.body.appendChild(this.fragment);

  this.dots = Array.from(document.querySelectorAll('.focus-dot'));
  this.dots.forEach(function (dot, index) {
    dot.addEventListener('click', function () {
      this$1.goToSection(index);
    }, false);
  });
};

Focus.prototype.initKeyboard = function initKeyboard () {
    var this$1 = this;

  window.addEventListener('keydown', function (event) {
    if (event.defaultPrevented) {
      return;
    }

    switch (event.key) {
    case 'ArrowDown':
      this$1.nextSection();
      break;
    case 'ArrowUp':
      this$1.previousSection();
      break;
    case 'ArrowRight':
      this$1.slideRight();
      break;
    case 'ArrowLeft':
      this$1.slideLeft();
      break;
    default:
      return;
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  }, true);
};

Focus.prototype.initScroll = function initScroll () {
  function handler(e) {
    event.preventDefault();
    // get scrolling value
    var value = e.wheelDelta || -e.deltaY || -e.detail;
    // get scrolling direction
    var delta = Math.max(-1, Math.min(1, value));

    if (this.scrollingValues.length > 99) {
      this.scrollingValues.shift();
    }
    this.scrollingValues.push(Math.abs(value));
    var scrollingStart = getAverage(this.scrollingValues, 50);
    var scrollingEnd = getAverage(this.scrollingValues, 10);
    if (scrollingEnd < scrollingStart) return;
    if (delta === 1) {
      this.previousSection();
      return false;
    }
    if (delta === -1) {
      this.nextSection();
      // Cancel default browser behavior
      return false;
    }
  }
  window.addEventListener('mousewheel', handler.bind(this), false);
  // fireFox
  window.addEventListener('DOMMouseScroll', handler.bind(this), false);
};

Focus.prototype.nextSection = function nextSection () {
  if (this.currentSection >= (this.sections.length - 1)) return;
  this.goToSection(this.currentSection + 1);
};

Focus.prototype.previousSection = function previousSection () {
  if (this.currentSection <= 0) return;
  this.goToSection(this.currentSection - 1);
};

Focus.prototype.goToSection = function goToSection (index) {
    var this$1 = this;

  if (this.isSliding) return;
  this.isSliding = true;

  this.el.style.transform = "translate3d(0, -" + (index * window.innerHeight) + "px, 0)";
  this.sections[this.currentSection].classList.remove('is-active');
  this.dots[this.currentSection].classList.remove('is-active');
  this.currentSection = index;

  this.sections[this.currentSection].classList.add('is-active');
  this.dots[this.currentSection].classList.add('is-active');
  setTimeout(function () { return this$1.isSliding = false; }, 500);
};

Focus.prototype.slideRight = function slideRight () {
  var currentSlideCount = this.slidesCount[this.currentSection];
  var currentSlide = this.currentSlides[this.currentSection];
  if(currentSlide < currentSlideCount - 1) {
    this.goToSlide(currentSlide + 1);
  }
};

Focus.prototype.slideLeft = function slideLeft () {
  var currentSlide = this.currentSlides[this.currentSection];
  if(currentSlide > 0) {
    this.goToSlide(currentSlide - 1);
  }
};

Focus.prototype.goToSlide = function goToSlide (index) {
  var currentSlideCount = this.slidesCount[this.currentSection];
  if (currentSlideCount === 0) return;
  this.currentSlides[this.currentSection] = index;
  this.sections[this.currentSection].style.marginLeft = "-" + (index * 100) + "%";
};

Focus.prototype.getSlidesCount = function getSlidesCount () {
  return this.sections.map(function (section) {
    return Array.from(section.querySelectorAll('.slide')).length;
  });
};

return Focus;

})));
