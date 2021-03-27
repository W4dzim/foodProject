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
});