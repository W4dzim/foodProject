'use strict';

window.addEventListener('DOMContentLoaded', () => {

  const tabHeader = document.querySelectorAll('.tabheader__item');
  const tabContent = document.querySelectorAll('.tabcontent');
  const tabHeaderParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    tabHeader.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i = 0) {
    tabContent[i].classList.add('show', 'fade');
    tabContent[i].classList.remove('hide');
    tabHeader[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();

  tabHeaderParent.addEventListener('click', e => {
    
    const target = e.target;

    if (target && target.matches('.tabheader__item')) {
      tabHeader.forEach((item, i) => {
        if (item == target) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  //timer

  const deadline = '2021-04-20';

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date());
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((t / (1000 * 60)) % 60);
    const seconds = Math.floor((t / 1000) % 60);

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds,
    };
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');
    const timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = t.days;
      hours.innerHTML = t.hours;
      minutes.innerHTML = t.minutes;
      seconds.innerHTML = t.seconds;

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('.timer', deadline);

});