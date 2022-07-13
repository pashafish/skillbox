/* Custom scroll */
const bodyScroll = new SimpleBar(document.body, {
  ariaLabel: 'Прокручиваемое содержимое'
});

new SimpleBar(document.querySelector('.login'), {
  ariaLabel: 'Прокручиваемое содержимое'
});

new SimpleBar(document.querySelector('.header__burger'), {
  ariaLabel: 'Прокручиваемое содержимое'
});

/* Custom Select*/
let select = document.querySelector('.broadcasts__selector-select');
const choices = new Choices(select, {
  searchEnabled: false,
  placeholder: false,
  shouldSort: false,
  allowHTML: false
});

/* Details */
let detailsHeader = document.querySelectorAll('.details-header');
detailsHeader.forEach(el => {
  let details = el.parentElement;
  let detailsBody = details.querySelector('.details-body');
  el.addEventListener('click', function() {
    details.removeAttribute('style');
    let detailsHeightFrom = details.offsetHeight;
    if(details.classList.contains('details--active')) {
      details.classList.remove('details--active')
      el.setAttribute('aria-selected','false');
      el.setAttribute('aria-expanded','false');
      detailsBody.setAttribute('aria-hidden','true');
      detailsBody.classList.add('hidden');
    }
    else {
      details.classList.add('details--active');
      el.setAttribute('aria-selected','true');
      el.setAttribute('aria-expanded','true');
      detailsBody.setAttribute('aria-hidden','false');
      detailsBody.classList.remove('hidden');
    }
    let detailsHeightTo = details.offsetHeight;
    if (detailsHeightTo < detailsHeightFrom) {
      details.style.minHeight = `${detailsHeightFrom}px`;
      setTimeout(function() {details.style.minHeight = `${detailsHeightTo}px`}, 50);
    }
    else {
      details.style.maxHeight = `${detailsHeightFrom}px`;
      setTimeout(function() {details.style.maxHeight = `${detailsHeightTo}px`}, 50);
    }
  });
  el.addEventListener('keyup', (e) => {
    console.log(e);
    if(e.key === 'Enter')
    {
      details.removeAttribute('style');
      let detailsHeightFrom = details.offsetHeight;
      if(details.classList.contains('details--active')) {
        details.classList.remove('details--active')
        el.setAttribute('aria-selected','false');
        el.setAttribute('aria-expanded','false');
        detailsBody.setAttribute('aria-hidden','true');
        detailsBody.classList.add('hidden');
      }
      else {
        details.classList.add('details--active');
        el.setAttribute('aria-selected','true');
        el.setAttribute('aria-expanded','true');
        detailsBody.setAttribute('aria-hidden','false');
        detailsBody.classList.remove('hidden');
      }
      let detailsHeightTo = details.offsetHeight;
      if (detailsHeightTo < detailsHeightFrom) {
        details.style.minHeight = `${detailsHeightFrom}px`;
        setTimeout(function() {details.style.minHeight = `${detailsHeightTo}px`}, 50);
      }
      else {
        details.style.maxHeight = `${detailsHeightFrom}px`;
        setTimeout(function() {details.style.maxHeight = `${detailsHeightTo}px`}, 50);
      }
    }
  });
  details.addEventListener('transitionend', (e) => {
    if(e.target === details) {
      details.removeAttribute('style');
    }
  });
});


/* Guest Select */
let guestLinks = document.querySelectorAll('.guests__details-link');
let guestImg = {
  xl: document.querySelector('.guest__img'),
  lg: document.querySelector('.guest__img').parentElement.querySelector('[media="(max-width: 1279.98px)"]'),
  md: document.querySelector('.guest__img').parentElement.querySelector('[media="(max-width: 991.98px)"]'),
  sm: document.querySelector('.guest__img').parentElement.querySelector('[media="(max-width: 767.98px)"]')
};
let guestSocials = document.querySelector('.guest__social');
let guestName = document.querySelector('.guest__name');
let guestDescr = document.querySelector('.guest__descr');
let guestLink = document.querySelector('.guest__link');

function createGuestSocialLink(href, type) {
  let guestSocialLink = document.createElement('a');
  guestSocialLink.setAttribute('href', href);
  guestSocialLink.classList.add('guest__social-link');
  guestSocialLink.classList.add('social-icon');
  let igIcon = document.querySelector('#ig-icon').children[0].cloneNode(true);
  let fbIcon = document.querySelector('#fb-icon').children[0].cloneNode(true);
  let twitterIcon = document.querySelector('#twitter-icon').children[0].cloneNode(true);
  switch(type) {
    case 'ig':
      guestSocialLink.setAttribute('aria-label', 'Инстаграм');
      guestSocialLink.append(igIcon);
      break;
    case 'fb':
      guestSocialLink.setAttribute('aria-label', 'Фейсбук');
      guestSocialLink.append(fbIcon);
      break;
    case 'twitter':
      guestSocialLink.setAttribute('aria-label', 'Твиттер');
      guestSocialLink.append(twitterIcon);
      break;
    default:
      return false;
  }
  return guestSocialLink;
}

function guestPick(el) {
  let guestID = el.getAttribute('data-guest-id');
  fetch('../guests.json', {method: 'GET', mode: 'same-origin', cache: 'only-if-cached', headers : {'Content-Type': 'application/json'}})
  .then((response) => {
  return response.json();
  })
  .then((data) => {
    let guestLinkActive = document.querySelector('.guests__details-link--active');
    if(guestLinkActive !==  el) {
      if(guestLinkActive !== null) {
        guestLinkActive.classList.remove('guests__details-link--active');
        el.setAttribute('aria-selected','false');
      }
      el.classList.add('guests__details-link--active');
      el.setAttribute('aria-selected','true');
      guestImg.xl.setAttribute('src', `img/guests/dummy-xl.svg`);
      guestImg.xl.setAttribute('alt', 'Тут будет фото гостя');
      guestImg.lg.setAttribute('srcset', `img/guests/dummy-lg.svg`);
      guestImg.md.setAttribute('srcset', `img/guests/dummy-md.svg`);
      guestImg.sm.setAttribute('srcset', `img/guests/dummy-sm.svg`);
      guestName.innerHTML = '';
      guestName.classList.remove('hidden');
      guestSocials.querySelectorAll('.guest__social-link').forEach(el => {
        el.remove();
      })
      guestSocials.classList.add('hidden');
      guestDescr.innerHTML = '';
      guestDescr.classList.add('hidden');
      guestLink.removeAttribute('href');
      guestLink.classList.add('hidden');
      if(typeof data[guestID] !== 'undefined') {
        if(typeof data[guestID]['name'] !== 'undefined') {
          guestImg.xl.setAttribute('alt', data[guestID]['name']);
          guestName.innerHTML = data[guestID]['name'];
        }
        else {
          guestImg.xl.setAttribute('alt', el.innerHTML);
          guestName.innerHTML = el.innerHTML;
        }
        guestName.classList.remove('hidden');
        fetch(`img/guests/${guestID}-xl.jpg`).then((responseImg) => {
          if(responseImg.ok) {
            guestImg.xl.setAttribute('src', `img/guests/${guestID}-xl.jpg`);
            guestImg.lg.setAttribute('srcset', `img/guests/${guestID}-lg.jpg`);
            guestImg.md.setAttribute('srcset', `img/guests/${guestID}-md.jpg`);
            guestImg.sm.setAttribute('srcset', `img/guests/${guestID}-sm.jpg`);
          }
          else {
            guestImg.xl.setAttribute('src', `img/guests/dummy-xl.svg`);
            guestImg.xl.setAttribute('alt', 'Тут будет фото гостя');
            guestImg.lg.setAttribute('srcset', `img/guests/dummy-lg.svg`);
            guestImg.md.setAttribute('srcset', `img/guests/dummy-md.svg`);
            guestImg.sm.setAttribute('srcset', `img/guests/dummy-sm.svg`);
          }
        });
        if(typeof data[guestID]['bio'] !== 'undefined') {
          guestDescr.innerHTML = data[guestID]['bio'];
          guestDescr.classList.remove('hidden');
        }
        if(typeof data[guestID]['socials'] !== 'undefined') {
          if(typeof data[guestID]['socials']['ig'] !== 'undefined') {
            let igLink = createGuestSocialLink(data[guestID]['socials']['ig'], 'ig');
            if(igLink !== false) {
              guestSocials.append(igLink);
              guestSocials.classList.remove('hidden');
            }
          }
          if(typeof data[guestID]['socials']['fb'] !== 'undefined') {
            let fbLink = createGuestSocialLink(data[guestID]['socials']['fb'], 'fb');
            if(fbLink !== false) {
              guestSocials.append(fbLink);
              guestSocials.classList.remove('hidden');
            }
          }
          if(typeof data[guestID]['socials']['twitter'] !== 'undefined') {
            let twitterLink = createGuestSocialLink(data[guestID]['socials']['twitter'], 'twitter');
            if(twitterLink !== false) {
              guestSocials.append(twitterLink);
              guestSocials.classList.remove('hidden');
            }
          }
        }
        if(typeof data[guestID]['link'] !== 'undefined') {
          guestLink.setAttribute('href', data[guestID]['link']);
          guestLink.classList.remove('hidden');
        }
      }
      else {
        guestName.innerHTML = el.innerHTML;
      }
      document.querySelector('#guest__bio').scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  });
}

guestLinks.forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    guestPick(el);
  });
});

/* Product Select */
let productSelect = document.querySelectorAll('.product__select');
let productLink = document.querySelector('.product__link');
productSelect.forEach(el => {
  el.addEventListener('change', function() {
    if(el.checked) {
      let productSelectValue = el.getAttribute('value');
      let productImgActive = document.querySelector('.product__img--active');
      productImgActive.classList.remove('product__img--active');
      let productImg = document.querySelector(`.product__img--${productSelectValue}`);
      productImg.classList.add('product__img--active');
      productLink.setAttribute('href', productLink.getAttribute(`data-href-${productSelectValue}`));
    }
  });
});

/* Podcasts More */
let podcasts = document.querySelector('.podcasts');
if(window.innerWidth < 768) {
  podcasts.setAttribute('data-max-podcasts-visible', '4');
} else {
  podcasts.setAttribute('data-max-podcasts-visible', '8');
}
let maxPodcastsVisible = Number(podcasts.getAttribute('data-max-podcasts-visible'));
let podcast = document.querySelectorAll('.podcast');
let podcastBtn = document.querySelector('.podcasts__btn');
if(podcast.length > maxPodcastsVisible) {
  podcast.forEach((el, i) => {
    if((i+1) > maxPodcastsVisible) {
      el.parentElement.classList.add('hidden');
    }
  });
  if (typeof podcastBtn.closest('.hidden') !== null) {
    podcastBtn.closest('.hidden').classList.remove('hidden');
  }
}
podcastBtn.addEventListener('click', function() {
  let podcastsHeightFrom = podcasts.offsetHeight;
  let hiddenPodcasts = document.querySelectorAll('.hidden .podcast');
  if(hiddenPodcasts !== null) {
    let hiddenPodcastsCount = hiddenPodcasts.length;
    hiddenPodcasts.forEach((el, i) => {
      if((i+1) <= maxPodcastsVisible) {
        el.closest('.hidden').classList.remove('hidden');
      }
    });
    if(hiddenPodcastsCount <= maxPodcastsVisible) {
      podcastBtn.closest('.row').classList.add('hidden');
    }
    podcasts.style.maxHeight = `${podcastsHeightFrom}px`;
    setTimeout(function() {podcasts.style.maxHeight = `${podcasts.scrollHeight}px`;}, 50);
  }
});
podcasts.addEventListener('transitionend', (e) => {
  if(e.target === podcasts) {
    podcasts.removeAttribute('style');
  }
});

/* Login Modal */
function getScrollBarWidth() {
  let scrollDiv = document.createElement('div');
  scrollDiv.style.overflowY = 'scroll';
  scrollDiv.style.width = '50px';
  scrollDiv.style.height = '50px';
  document.body.append(scrollDiv);
  let scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  scrollDiv.remove();
  return scrollBarWidth;
}
function stopScroll(exeptElem) {
  //document.body.setAttribute('style', `padding-right: ${getScrollBarWidth()}px; overflow: hidden;`);
  document.body.setAttribute('style', 'overflow: hidden;');
  bodyScroll.recalculate();
  let childNodes = document.body.querySelectorAll('a[href]:not([tabindex="-1"]), area[href]:not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), iframe:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"]), [contentEditable=true]:not([tabindex="-1"])');
  childNodes.forEach(el => {
    if(!exeptElem.contains(el)) {
      el.setAttribute('data-tabindex', el.hasAttribute('tabindex') ? el.getAttribute('tabindex') : 'underfined');
      el.setAttribute('tabindex', '-1');
    }
  });
}
function startScroll() {
  document.body.removeAttribute('style');
  bodyScroll.recalculate();
  let childNodes = document.body.querySelectorAll('[data-tabindex]');
  childNodes.forEach(el => {
    el.removeAttribute('tabindex');
    if(el.getAttribute('data-tabindex') !== 'underfined') {
      el.setAttribute('tabindex', el.getAttribute('data-tabindex'));
    }
    el.removeAttribute('data-tabindex');
  });
}
let loginBtn = document.querySelectorAll('.header__login');
let loginCloseBtn = document.querySelector('.login__close-btn');
let loginModal = document.querySelector('.login');
let LoginModalFrame = document.querySelector('.login__form');
loginBtn.forEach(el => {
  el.addEventListener('click', function() {
    loginModal.classList.remove('hidden');
    loginModal.classList.remove('pre-hidden');
    stopScroll(loginModal);
    LoginModalFrame.querySelector('input').focus();
  });
});

loginCloseBtn.addEventListener('click', (e) => {
  e.preventDefault();
  loginModal.classList.add('pre-hidden');
  startScroll();
}, {passive: false});
loginModal.addEventListener('transitionend', (e) => {
  if(e.target === loginModal) {
    if(loginModal.classList.contains('pre-hidden')) {
      loginModal.classList.add('hidden');
      startScroll();
    }
  }
});

/* Playlists Select */
let playlistsSelect = document.querySelectorAll('input[name="playlists-genre"]');
let playlistWrapper = document.querySelectorAll('[data-genre]');
let playlists = document.querySelector('.playlists');
playlistsSelect.forEach(el => {
  if(el.checked) {
    let playlistsGenre = el.getAttribute('value');
    playlistWrapper.forEach(el1 => {
      if(el1.getAttribute('data-genre') !== playlistsGenre) {
        el1.classList.add('hidden');
      }
    });
  }
  el.addEventListener('click', function() {
    let playlistsGenre = el.getAttribute('value');
    playlists.removeAttribute('style');
    let playlistsHeightFrom = playlists.offsetHeight;
    playlistWrapper.forEach(el1 => {
      if(el1.getAttribute('data-genre') !== playlistsGenre) {
        el1.classList.add('hidden');
      }
      else {
        el1.classList.remove('hidden');
      }
    });
    let playlistsHeightTo = playlists.offsetHeight;
    if (playlistsHeightTo < playlistsHeightFrom) {
      playlists.style.minHeight = `${playlistsHeightFrom}px`;
      setTimeout(function() {playlists.style.minHeight = `${playlistsHeightTo}px`}, 50);
    }
    else {
      playlists.style.maxHeight = `${playlistsHeightFrom}px`;
      setTimeout(function() {playlists.style.maxHeight = `${playlistsHeightTo}px`}, 50);
    }
  });
});
playlists.addEventListener('transitionend', (e) => {
  if(e.target === playlists) {
    playlists.removeAttribute('style');
  }
});


/*Broadcasts Select */
let broadcastsSelect = document.querySelector('.broadcasts__selector-select');
let broadcastsWrapper = document.querySelectorAll('[data-broadcasts-author]');
let broadcasts = document.querySelector('.broadcasts');
let broadcastsSelectedValue = broadcastsSelect.value;
broadcastsWrapper.forEach(el => {
  if(el.getAttribute('data-broadcasts-author') !== broadcastsSelectedValue) {
    el.classList.add('hidden');
  }
});
broadcastsSelect.addEventListener('change', function() {
  broadcastsSelectedValue = broadcastsSelect.value;
  let broadcastsHeightFrom = broadcasts.offsetHeight;
  broadcastsWrapper.forEach(el => {
    if(el.getAttribute('data-broadcasts-author') !== broadcastsSelectedValue) {
      el.classList.add('hidden');
    }
    else {
      el.classList.remove('hidden');
    }
  });
  let broadcastsHeightTo = broadcasts.offsetHeight;
  if (broadcastsHeightTo < broadcastsHeightFrom) {
    broadcasts.style.minHeight = `${broadcastsHeightFrom}px`;
    setTimeout(function() {broadcasts.style.minHeight = `${broadcastsHeightTo}px`}, 50);
  }
  else if (broadcastsHeightTo > broadcastsHeightFrom) {
    broadcasts.style.maxHeight = `${broadcastsHeightFrom}px`;
    setTimeout(function() {broadcasts.style.maxHeight = `${broadcastsHeightTo}px`}, 50);
  }
});
broadcasts.addEventListener('transitionend', (e) => {
  if(e.target === broadcasts) {
    broadcasts.removeAttribute('style');
  }
});

/* Form Check */
function ErrorMsg(errorMsg, errorInput, isShow) {
  let inputContainer = errorInput.parentElement;
  let errorContainer = inputContainer.querySelector('.form-error-msg');
  if (isShow) {
    errorContainer.innerText = errorMsg;
    inputContainer.classList.add('form-wrapper--error');
    errorInput.setAttribute('aria-invalid', 'true');
  } else {
    inputContainer.classList.remove('form-wrapper--error');
    errorInput.setAttribute('aria-invalid', 'false');
  }
}
function inputCheck(input) {
  let imputType = input.getAttribute('data-type') === 'login' ? 'login' : input.type;
  let regExp = new RegExp();
  let imputValue = input.value;
  let errorMsg = new String();
  if (imputType === 'text') {
    errorMsg = (imputValue === '') ? 'Вы не ввели имя' : '';
    regExp = RegExp('^([A-Za-zА-Яа-я]{1,}[\- ]{0,1}){1,}$');
    if (regExp.test(imputValue)) { ErrorMsg(errorMsg, input, false) }
    else {
      errorMsg = errorMsg === '' ? 'Вы ввели некорректное имя' : errorMsg;
      ErrorMsg(errorMsg, input, true);
    }
  }
  if (imputType === 'email') {
    errorMsg = (imputValue === '') ? 'Вы не ввели e-mail' : '';
    regExp = RegExp('.+(\@).+[.].+');
    if (regExp.test(imputValue)) { ErrorMsg(errorMsg, input, false) }
    else {
      errorMsg = errorMsg === '' ? 'Вы ввели некорректный e-mail' : errorMsg;
      ErrorMsg(errorMsg, input, true);
    }
  }
  if (imputType === 'textarea') {
    errorMsg = (imputValue === '') ? 'Вы не ввели сообщение' : '';
    ErrorMsg(errorMsg, input, errorMsg !== '');
  }
  if (imputType === 'checkbox') {
    imputValue = input.checked;
    errorMsg = imputValue ? '' : 'Вы не отметили флажок';
    ErrorMsg(errorMsg, input, !imputValue);
  }
  if (imputType === 'password') {
    errorMsg = (imputValue === '') ? 'Вы не ввели пароль' : '';
    ErrorMsg(errorMsg, input, errorMsg !== '');
  }
  if (imputType === 'login') {
    errorMsg = (imputValue === '') ? 'Вы не ввели логин' : '';
    ErrorMsg(errorMsg, input, errorMsg !== '');
  }
}
function sendForm(form) {
  let formSubmit = form.querySelector('.submit-btn');
  let formInp = form.querySelectorAll('.form-inp');
  formSubmit.setAttribute('aria-busy','true');
  formSubmit.setAttribute('aria-disabled','true');
  formSubmit.classList.add('submit-btn-disabled');
  formInp.forEach(el => {
    el.setAttribute('disabled','');
    formSubmit.setAttribute('aria-disabled','true');
  });
  let formAction = form.getAttribute('action');
  let formData = new FormData(form);
  let formDataObject = new Object();
  formData.forEach(function(value, key) {
    formDataObject[key] = value;
  });
  let formDataJson = JSON.stringify(formDataObject);
  //sendform
}
let formImput = document.querySelectorAll('.form-inp');
let formButton = document.querySelectorAll('.submit-btn');
formImput.forEach(elem => {
  elem.addEventListener('change', (e) => { inputCheck(e.target) });
  elem.addEventListener('input', (e) => {
    if (e.target.parentElement.classList.contains('form-wrapper--error')) { inputCheck(e.target) }
  });
});
formButton.forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    let switcher = true;
    let form = el.closest('form');
    let formInp = form.querySelectorAll('.form-inp');
    formInp.forEach(el1 => {
      inputCheck(el1);
      if (el1.parentElement.classList.contains('form-wrapper--error') && switcher) {
        el1.focus();
        switcher = false;
      }
    });
    if (switcher && !el.classList.contains('.submit-btn-disabled')) {
      sendForm(form);
    }
  }, {passive: false});
});

/* Smooth scroll */
let smoothLinks = document.querySelectorAll('a[href^="#"]');
smoothLinks.forEach(el => {
  el.addEventListener('click',(e) => {
    e.preventDefault();
    let scrollToElement = new Object();
    try {
      scrollToElement = document.querySelector(el.getAttribute('href'));
    } catch (error) {
      return false;
    }
    if(scrollToElement !== null) {
      if(typeof el.closest('.header__burger')) {
        headerBurger.classList.add('pre-hidden');
      }
      scrollToElement.scrollIntoView({behavior:"smooth", block:"start"});
    }
  }, {passive: false});
})

/* About Swiper */
const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: false,
  slidesPerView: 2,
  spaceBetween: Number(getComputedStyle(document.body).getPropertyValue('--gutter').replace('px','')),
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  a11y: {
    prevSlideMessage: 'Предыдущий слайд',
    nextSlideMessage: 'Следующий слайд',
    firstSlideMessage: 'Это первый слайд',
    lastSlideMessage: 'Это последний слайд'
  },
  breakpoints: {
    // when window width is >= 1280px
    1280: {
      slidesPerView: 4
    }
  }
});

/* Search */
let searchOpenBtn = document.querySelector('#header__search-open');
let searchBtn = document.querySelector('#header__search');
let searchWrapper = searchBtn.parentElement;
let searchInp = searchWrapper.querySelector('.header__search-inp');
searchOpenBtn.addEventListener('click', function() {
  searchOpenBtn.setAttribute('tabindex', '-1');
  searchOpenBtn.setAttribute('aria-disabled', 'true');
  searchWrapper.classList.remove('hidden');
  searchWrapper.classList.remove('pre-hidden');
  searchInp.focus();
});
document.addEventListener('click', (e) => {
  if((!e.composedPath().includes(searchWrapper)) && (!searchOpenBtn.contains(e.target))) {
    searchWrapper.classList.add('pre-hidden');
  }
});
document.addEventListener('keyup', (e) => {
  if((e.key === "Enter") && (!searchWrapper.contains(e.target)) && (!searchOpenBtn.contains(e.target))) {
    searchWrapper.classList.add('pre-hidden');
  }
});
searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let errorMsg = document.querySelector('#header__form-search-error-msg');
  if(searchInp.value === '') {
    searchWrapper.classList.add('animate-head-shake');
    searchInp.focus();
    errorMsg.innerText = 'Вы не ввели поисковый запрос';
    setTimeout(function() { errorMsg.innerText = ''; }, 300);
  }
  else {
    //Search
  }
}, {passive: false})
searchWrapper.addEventListener('animationend', (e) => {
  if(e.target === searchWrapper) {
    searchWrapper.classList.remove('animate-head-shake');
  }
});
searchWrapper.addEventListener('transitionend', (e) => {
  if(e.target === searchWrapper) {
    if(searchWrapper.classList.contains('pre-hidden')) {
      searchOpenBtn.removeAttribute('tabindex');
      searchOpenBtn.removeAttribute('aria-disabled');
      searchWrapper.classList.add('hidden');
      searchInp.blur();
    }
  }
});

/* Header Details Fix */
let headerDetails = document.querySelector('.header__details');
let headerDetailsBody = document.querySelector('.header__players');
if(window.innerWidth >= 768) {
  headerDetailsBody.classList.remove('hidden');
  headerDetailsBody.setAttribute('aria-hidden','false');
}

window.addEventListener('resize', function() {
  if(window.innerWidth >= 768) {
    headerDetailsBody.classList.remove('hidden');
    headerDetailsBody.setAttribute('aria-hidden','false');
  }
  else if (!headerDetails.classList.contains('details--active')) {
    headerDetailsBody.classList.add('hidden');
    headerDetailsBody.setAttribute('aria-hidden','true');
  }
});

/* Header Burger */
let headerBurgerBtn = document.querySelector('.header__burger-btn');
let headerBurger = document.querySelector('.header__burger');
let headerBurgerClose = document.querySelector('.header__burger-close');
headerBurgerBtn.addEventListener('click', function() {
  headerBurger.classList.remove('hidden');
  headerBurger.classList.remove('pre-hidden');
  headerBurger.setAttribute('aria-hidden', 'false');
  stopScroll(headerBurger);
});
headerBurgerClose.addEventListener('click', function() {
  headerBurger.classList.add('pre-hidden');
});
headerBurger.addEventListener('transitionend', (e) => {
  if(e.target === headerBurger) {
    if(headerBurger.classList.contains('pre-hidden')) {
      headerBurger.classList.add('hidden');
      headerBurger.setAttribute('aria-hidden', 'true');
      startScroll();
    }
  }
});
