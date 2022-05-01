let hnav = document.querySelector('.header__nav');
let burger = document.querySelector('.header__h-button');
let hclose = document.querySelector('.header__nav-close');
let hlink = document.querySelectorAll('.header__list-link');
let hlistItem = document.querySelectorAll('.header__list-item');

hnav.close = function() {
  this.classList.add('header__nav--visible');
  this.classList.remove('header__nav--active');
  document.body.classList.remove('stop-scroll');
}

hnav.open = function() {
  this.classList.add('header__nav--visible');
  this.classList.add('header__nav--active');
  document.body.classList.add('stop-scroll');
}

document.addEventListener('click', function(e) {
  const clickInside = e.composedPath().includes(hnav);
  const clickInsideBtn = e.composedPath().includes(burger);
  if (!clickInside && !clickInsideBtn) {
    hnav.close();
  }
});

burger.addEventListener('click', function(e) {
  hnav.open();
});

hclose.addEventListener('click', function() {
  hnav.close();
});

hnav.addEventListener('transitionend', function() {
  hnav.classList.remove('header__nav--visible');
});

hlink.forEach(function(elem) {
  elem.addEventListener('click', function() {
    hnav.close();
  });
});

hlistItem.forEach(function(elem, i) {
  elem.style.setProperty('transition-delay', String(50 * i) + 'ms');
});



let workBtn = document.querySelectorAll('.work__list-link');
let workContent = document.querySelectorAll('.work__block');

workBtn.forEach(function(elem) {
  elem.addEventListener('click', function(e) {
    const dataPath = e.currentTarget.dataset.path;
    workBtn.forEach(function(btn) {
      btn.classList.remove('work__list-link--active');
      btn.removeAttribute('tabIndex');
    });
    e.currentTarget.classList.add('work__list-link--active');
    e.currentTarget.setAttribute('tabIndex', '-1');
    workContent.forEach(function(wCont) {
      wCont.classList.remove('work__block--active');
    });
    document.querySelector(`[data-target="${dataPath}"]`).classList.add('work__block--active');
  });
});



swiper = new Swiper('.swiper', {
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  },
  autoplay: {
    delay: 3000
  }
});


$(".faq__details").accordion({
  heightStyle: "content",
  collapsible: true,
  active: false,
  animate: 200
});


let hFormWrapper = document.querySelector('.header__form-wrapper');
let hForm = document.querySelector('.header__form');
let hSearchBtn = document.querySelector('.header__search');
let hSearchCloseBtn = document.querySelector('.header__search-close');
let hSearchInput = document.querySelector('.header__form-search');

hSearchBtn.addEventListener('click', function(e) {
  hFormWrapper.classList.add('header__form-wrapper--active');
  setTimeout(function() {
    hSearchInput.focus();
  }, 200);
});
hSearchCloseBtn.addEventListener('click', function() {
  hFormWrapper.classList.remove('header__form-wrapper--active');
  hSearchInput.blur();
});
document.addEventListener('click', function(e) {
  const clickInside = e.composedPath().includes(hForm);
  const clickInsideBtn = e.composedPath().includes(hSearchBtn);
  if (!clickInside && !clickInsideBtn) {
    hFormWrapper.classList.remove('header__form-wrapper--active');
  }
});
