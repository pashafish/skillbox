/*Select*/
let select = document.querySelector('.select');
const choices = new Choices(select, {
  searchEnabled: false,
  placeholder: true,
  shouldSort: false
});

/*Tooltip*/
let tooltipButtons = document.querySelectorAll('.tooltip__button');

function tooltipOpen(event) {
  let tooltipButton = event.target;
  let tooltipY = tooltipButton.getBoundingClientRect().y;
  let tooltip = tooltipButton.firstElementChild;
  if(tooltip !== null) {
    let tooltipHeight = tooltip.offsetHeight;
    tooltip.classList.add('tooltip--visible');
    if (tooltipY > tooltipHeight) {
      tooltip.classList.remove('tooltip--bottom');
      tooltip.classList.add('tooltip--top')
    }
    else {
      tooltip.classList.remove('tooltip--top');
      tooltip.classList.add('tooltip--bottom');
    }
  }
}

function tooltipClose(event) {
  let tooltipButton = event.target;
  let tooltip = tooltipButton.firstElementChild;
  if((tooltip !== null) && (document.activeElement !== tooltipButton)) {
    tooltip.classList.remove('tooltip--visible');
  }
}

tooltipButtons.forEach(tooltipButton => {
  tooltipButton.addEventListener('mouseenter', tooltipOpen.bind());
  tooltipButton.addEventListener('focus', tooltipOpen.bind());
  tooltipButton.addEventListener('mouseleave', tooltipClose.bind());
  tooltipButton.addEventListener('blur', tooltipClose.bind());
});


/*Map*/
ymaps.ready(initMap);

function initMap() {
  let myMap = new ymaps.Map("map", {
    center: [48.87218507, 2.35422400],
    zoom: 16
    }),

    myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
        hintContent: 'Франция, Иль-де-Франс, Париж, X округ Парижа, улица дю Фобур Сен Дени, 54',
        balloonContent: 'Франция, Иль-де-Франс, Париж, X округ Парижа, улица дю Фобур Сен Дени, 54'
    }, {
        iconLayout: 'default#image',
        iconImageHref: 'img/placemark.svg',
        iconImageSize: [28, 40],
        iconImageOffset: [-14, -40]
  });
  myMap.geoObjects.add(myPlacemark);

  let map = document.querySelectorAll('.map');
  document.addEventListener('click', (e) => {
    map.forEach(elem => {
      if(e.composedPath().includes(elem)) { elem.classList.add('map--active') }
      else { elem.classList.remove('map--active') }
    });
  });
  document.addEventListener('touchstart', (e) => {
    map.forEach(elem => {
      if(e.composedPath().includes(elem)) { elem.classList.add('map--active') }
      else { elem.classList.remove('map--active') }
    });
  });
}


/*Form*/
function ErrorMsg(errorMsg, errorInput, isShow) {
  let inputContainer = errorInput.parentElement;
  let errorContainer = inputContainer.firstElementChild;
  if (isShow) {
    errorContainer.innerText = errorMsg;
    inputContainer.classList.add('form__input-wrapper--error');
  } else { inputContainer.classList.remove('form__input-wrapper--error') }
}
function inputCheck(input) {
  let imputType = input.type;
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
    regExp = RegExp('^[A-Za-z0-9_\-][\.]{0,1}([A-Za-z0-9_\-]{1,}[\.]{0,1}){0,}([A-Za-z0-9_\-]{1,})\@([A-Za-z0-9_\-]{1,}[\.]{0,1}){0,}([A-Za-z0-9_\-]{1,})[\.][A-Za-z]{2,4}$');
    if (regExp.test(imputValue)) { ErrorMsg(errorMsg, input, false) }
    else {
      errorMsg = errorMsg === '' ? 'Вы ввели некорректный e-mail' : errorMsg;
      ErrorMsg(errorMsg, input, true);
    }
  }
  if (imputType === 'tel') {
    imputValue = input.inputmask.unmaskedvalue();
    if (imputValue.length === 0) { errorMsg = 'Вы не ввели телефон' }
    else if (imputValue.length < 10) { errorMsg = 'Телефон должен содержать 10 цифр' }
    regExp = RegExp('^([0-9]){10}$');
    if (regExp.test(imputValue)) { ErrorMsg(errorMsg, input, false) }
    else {
      errorMsg = errorMsg === '' ? 'Вы ввели некорректный телефон' : errorMsg;
      ErrorMsg(errorMsg, input, true);
    }
  }
}

let formImput = document.querySelectorAll('.form__input');
let formImputTel = document.querySelectorAll('.form__input[type="tel"]');
let formButton = document.querySelectorAll('.form__btn');
let formImputMask = new Inputmask("+7 999 999-99-99");
formImputTel.forEach(elem => {formImputMask.mask(elem)});

formImput.forEach(elem => {
  elem.addEventListener('change', (e) => { inputCheck(e.target) });
  elem.addEventListener('input', (e) => {
    if (e.target.parentElement.classList.contains('form__input-wrapper--error')) { inputCheck(e.target) }
  });
});

formButton.forEach(elem => {
  elem.addEventListener('click', (e) => {
    let thisformImput = e.target.parentElement.querySelectorAll('.form__input');
    let switcher = true;
    thisformImput.forEach(element => {
      inputCheck(element);
      if (element.parentElement.classList.contains('form__input-wrapper--error')) {
        e.preventDefault();
        if(switcher) {
          element.focus();
          switcher = false;
        }
      }
    });
  });
});
