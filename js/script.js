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

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }
  
  function setClock(selector, endtime) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');
    const timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('.timer', deadline);

  // modal

  const modal    = document.querySelector('.modal');
  const modalTrigger = document.querySelectorAll('[data-modal]');
  const modalCloseBtn = document.querySelector('[data-close]');
  
  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';  
    clearInterval(modalTimerId);
  }

  modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal);
  });


  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  modalCloseBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal(); 
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modal.classList.contains('show')) {
      closeModal();
    }
  });
 
  const modalTimerId = setTimeout(openModal, 5000);

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }    
  }

  window.addEventListener('scroll', showModalByScroll);

});