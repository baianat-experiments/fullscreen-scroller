import { select, getAverage, getArray } from './utilities';


class Focus {
  constructor(selector, settings) {
    this.el = select(selector);
    this.settings = settings;
    this.init();
  }

  init() {
    this.sections        = Array.from(this.el.querySelectorAll('.section'));
    this.currentSection  = 0;
    this.slides          = this.getSlides();
    this.slidesCount     = this.getSlidesCount();
    this.activeSlide     = '';
    this.currentSlides   = getArray(this.sections.length, 0);
    this.isSliding       = false;
    this.scrollingValues = [];

    this.initDots();
    this.initKeyboard();
    this.initScroll();
    this.goToSection(0);
    this.goToSlide(this.slides[0]);
  }

  initDots() {
    this.fragment = document.createDocumentFragment();
    const focusNav = document.createElement('ul');
    focusNav.classList.add('focus-nav');
    focusNav.insertAdjacentHTML('afterbegin',
      '<li><a class="focus-dot"></a></il>'.repeat(this.sections.length)
    );
    this.fragment.appendChild(focusNav);
    document.body.appendChild(this.fragment);

    this.dots = Array.from(document.querySelectorAll('.focus-dot'));
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.goToSection(index);
      }, false);
    });
  }

  initKeyboard() {
    window.addEventListener('keydown', (event) => {
      if (event.defaultPrevented) {
        return;
      }

      switch (event.key) {
      case 'ArrowDown':
        this.nextSection();
        break;
      case 'ArrowUp':
        this.previousSection();
        break;
      case 'ArrowRight':
        this.slideRight();
        break;
      case 'ArrowLeft':
        this.slideLeft();
        break;
      default:
        return;
      }

      // Cancel the default action to avoid it being handled twice
      event.preventDefault();
    }, true);
  }

  initScroll() {
    function handler(e) {
      event.preventDefault();
      // get scrolling value
      const value = e.wheelDelta || -e.deltaY || -e.detail;
      // get scrolling direction
      const delta = Math.max(-1, Math.min(1, value));

      if (this.scrollingValues.length > 99) {
        this.scrollingValues.shift();
      }
      this.scrollingValues.push(Math.abs(value));
      const scrollingStart = getAverage(this.scrollingValues, 50);
      const scrollingEnd = getAverage(this.scrollingValues, 10);
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
  }

  nextSection() {
    if (this.currentSection >= (this.sections.length - 1)) return;
    this.goToSection(this.currentSection + 1);
  }

  previousSection() {
    if (this.currentSection <= 0) return;
    this.goToSection(this.currentSection - 1);
  }

  goToSection(index) {
    if (this.isSliding) return;
    this.isSliding = true;

    this.el.style.transform = `translate3d(0, -${index * window.innerHeight}px, 0)`;
    this.sections[this.currentSection].classList.remove('is-active');
    this.dots[this.currentSection].classList.remove('is-active');
    this.currentSection = index;

    this.sections[this.currentSection].classList.add('is-active');
    this.dots[this.currentSection].classList.add('is-active');
    setTimeout(() => this.isSliding = false, 500);
  }

  slideRight() {
    const currentSlideCount = this.slidesCount[this.currentSection];
    const currentSlide = this.currentSlides[this.currentSection];
    if(currentSlide < currentSlideCount - 1) {
      this.goToSlide(currentSlide + 1);
    }
  }

  slideLeft() {
    const currentSlide = this.currentSlides[this.currentSection];
    if(currentSlide > 0) {
      this.goToSlide(currentSlide - 1);
    }
  }

  goToSlide(index) {
    const currentSlideCount = this.slidesCount[this.currentSection];
    if (currentSlideCount === 0) return;
    if (this.activeSlide) this.activeSlide.classList.remove('is-active');
    this.activeSlide = this.slides[this.currentSection][index];
    this.activeSlide.classList.add('is-active');
    this.currentSlides[this.currentSection] = index;
    this.sections[this.currentSection].style.marginLeft = `-${index * 100}%`;
  }

  getSlidesCount() {
    return this.sections.map((section) => {
      return Array.from(section.querySelectorAll('.slide')).length;
    });
  }

  getSlides() {
    return this.sections.map((section) => {
      return Array.from(section.querySelectorAll('.slide'));
    });
  }
}

export default Focus;
