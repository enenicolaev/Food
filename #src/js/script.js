
import calc from './modules/calc';
import tabs from './modules/tabs';
import modal from './modules/modal';
import { openModal } from './modules/modal';
import forms from './modules/forms';
import slider from './modules/slider';
import cards from './modules/cards';
import timer from './modules/timer';



window.addEventListener('DOMContentLoaded', function () {

   const modalTimerId = setTimeout(() => {
      openModal('.modal', modalTimerId)
   }, 30000);

   tabs({
      tabSelector: '.tabheader__item',
      tabsContentSelector: '.tabcontent',
      tabsParentSelector: '.tabheader__items'
   });

   slider({
      slideSelector: ".offer__slide",
      prevArrowSelector: ".offer__slider-prev",
      nextArrowSelector: ".offer__slider-next",
      totalNumSelector: "#total",
      currentNumSelector: "#current",
      wrapperSelector: ".offer__slider-wrapper",
      fieldSelector: ".offer__slider-inner"
   })

   calc();
   modal(".modal", modalTimerId);
   forms("form");
   cards();
   timer("2021-05-20");

});