(function() {
    "use strict";
  
    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
      el = el.trim()
      if (all) {
        return [...document.querySelectorAll(el)]
      } else {
        return document.querySelector(el)
      }
    }
  
    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
      let selectEl = select(el, all)
      if (selectEl) {
        if (all) {
          selectEl.forEach(e => e.addEventListener(type, listener))
        } else {
          selectEl.addEventListener(type, listener)
        }
      }
    }
  
    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
      el.addEventListener('scroll', listener)
    }
  
    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
      let position = window.scrollY + 200
      navbarlinks.forEach(navbarlink => {
        if (!navbarlink.hash) return
        let section = select(navbarlink.hash)
        if (!section) return
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add('active')
        } else {
          navbarlink.classList.remove('active')
        }
      })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)
  
    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
      let header = select('#header')
      let offset = header.offsetHeight
  
      let elementPos = select(el).offsetTop
      window.scrollTo({
        top: elementPos - offset,
        behavior: 'smooth'
      })
    }
  
    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select('#header')
    let selectTopbar = select('#topbar')
    if (selectHeader) {
      const headerScrolled = () => {
        if (window.scrollY > 100) {
          selectHeader.classList.add('header-scrolled')
          if (selectTopbar) {
            selectTopbar.classList.add('topbar-scrolled')
          }
        } else {
          selectHeader.classList.remove('header-scrolled')
          if (selectTopbar) {
            selectTopbar.classList.remove('topbar-scrolled')
          }
        }
      }
      window.addEventListener('load', headerScrolled)
      onscroll(document, headerScrolled)
    }
  
    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.classList.add('active')
        } else {
          backtotop.classList.remove('active')
        }
      }
      window.addEventListener('load', toggleBacktotop)
      onscroll(document, toggleBacktotop)
    }
  
    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function(e) {
      select('#navbar').classList.toggle('navbar-mobile')
      this.classList.toggle('bi-list')
      this.classList.toggle('bi-x')
    })
  
    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function(e) {
      if (select('#navbar').classList.contains('navbar-mobile')) {
        e.preventDefault()
        this.nextElementSibling.classList.toggle('dropdown-active')
      }
    }, true)
  
    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function(e) {
      if (select(this.hash)) {
        e.preventDefault()
  
        let navbar = select('#navbar')
        if (navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile')
          let navbarToggle = select('.mobile-nav-toggle')
          navbarToggle.classList.toggle('bi-list')
          navbarToggle.classList.toggle('bi-x')
        }
        scrollto(this.hash)
      }
    }, true)
  
    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
      if (window.location.hash) {
        if (select(window.location.hash)) {
          scrollto(window.location.hash)
        }
      }
    });
  
    /**
     * Preloader
     */
    let preloader = select('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.remove()
      });
    }
  
    /**
     * Menu isotope and filter
     */
    window.addEventListener('load', () => {
      let menuContainer = select('.menu-container');
      if (menuContainer) {
        let menuIsotope = new Isotope(menuContainer, {
          itemSelector: '.menu-item',
          layoutMode: 'fitRows'
        });
  
        let menuFilters = select('#menu-flters li', true);
  
        on('click', '#menu-flters li', function(e) {
          e.preventDefault();
          menuFilters.forEach(function(el) {
            el.classList.remove('filter-active');
          });
          this.classList.add('filter-active');
  
          menuIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          menuIsotope.on('arrangeComplete', function() {
            AOS.refresh()
          });
        }, true);
      }
  
    });
  
    /**
     * Initiate glightbox 
     */
    const glightbox = GLightbox({
      selector: '.glightbox'
    });
  
    /**
     * Events slider
     */
    new Swiper('.events-slider', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });
  
    /**
     * Testimonials slider
     */
    new Swiper('.testimonials-slider', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
  
        1200: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      }
    });
  
    /**
     * Initiate gallery lightbox 
     */
    const galleryLightbox = GLightbox({
      selector: '.gallery-lightbox'
    });
  
    /**
     * Animation on scroll
     */
    window.addEventListener('load', () => {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      })
    });
  
  })()





  // ==== catering ====

  const container = document.querySelector('.slide-container');
const slides = document.querySelectorAll('.slide');
const btns = document.querySelectorAll('.btn');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

const n = slides.length;
const angle = 360 / n;

let setId = 0;
let deg = [];
let x = 0;
let y = 0;

const touchDevice = () => ('ontouchstart' in document.documentElement);
const setTransition = (time) => {
  let i = 0;
  for (; i < n; i++) slides[i].style.transition = `all ${time}s`;
}
const positionSlides = () => {
  const r = container.offsetWidth / 2;
  let i = 0;
  
  setTransition('0');
  
  for (; i < n; i++) {
    deg[i] = i * angle;
    x = Math.cos(deg[i] * (Math.PI / 180)) * r + r;
    y = Math.sin(deg[i] * (Math.PI / 180)) * r + r;
    
    slides[i].style.top = `${~~y}px`;
    slides[i].style.left = `${~~x}px`;
  }
  
  setTimeout(() => {
    setTransition('.3');
  }, 10);
}
const prevSlide = () => {
  let i = 0;
  for (; i < n; i++) deg[i] -= angle;
  animateSlide();
}
const nextSlide = () => {
  let i = 0;
  for (; i < n; i++) deg[i] += angle;
  animateSlide();
}
const animateSlide = () => {
  const r = container.offsetWidth / 2;
  let i = 0;
  
  for (; i < n; i++) {
    x = Math.cos(deg[i] * (Math.PI / 180)) * r + r;
    y = Math.sin(deg[i] * (Math.PI / 180)) * r + r;
    
    slides[i].style.top = `${~~y}px`;
    slides[i].style.left = `${~~x}px`;
    
    y === 0 ? slides[i].classList.add('active') : slides[i].classList.remove('active');
  }
  
  const activeSlide = document.querySelector('.slide.active');
  const slideBgImg = getComputedStyle(activeSlide).backgroundImage;
  
  container.style.backgroundImage = slideBgImg;
}
const autoPlay = () => setId = setInterval(nextSlide, 3000);
const changeSlideImg = (e) => {
  let i = 0;
  for (; i < n; i++) slides[i].classList.remove('active');
  e.currentTarget.classList.add('active');

  const activeSlide = document.querySelector('.slide.active');
  const slideBgImg = getComputedStyle(activeSlide).backgroundImage;

  container.style.backgroundImage = slideBgImg;
}

positionSlides();
nextSlide();
autoPlay();

btnPrev.addEventListener('click', prevSlide);
btnNext.addEventListener('click', nextSlide);
btns.forEach(btn => {
  btn.addEventListener('mouseenter', () => clearInterval(setId));
  btn.addEventListener('mouseleave', () => {
    clearInterval(setId);
    autoPlay();
  });
})
slides.forEach(slide => {
  if (touchDevice()) {
    slide.addEventListener('click', (e) => {
      changeSlideImg(e);
      clearInterval(setId);
      autoPlay();
    });
  }
  else {
    slide.addEventListener('mouseenter', (e) => {
      changeSlideImg(e);
      clearInterval(setId);
    });
    slide.addEventListener('mouseleave', () => {
      clearInterval(setId);
      autoPlay();
    });
  }
})
window.addEventListener('resize', () => {
  clearInterval(setId);
  positionSlides();
  autoPlay();
})


  





 