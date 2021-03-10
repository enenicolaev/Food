// Modal



function closeModal(selector) {
   const modal = document.querySelector(selector);

   modal.classList.add('hide');
   modal.classList.remove('show');
   document.body.style.overflow = '';
}

function openModal(selector, timerOff) {
   const modal = document.querySelector(selector);

   modal.classList.add('show');
   modal.classList.remove('hide');
   document.body.style.overflow = 'hidden';

   if (timerOff) {
      clearInterval(timerOff);
   }
}


function modal(modalSelector, modalTimerId) {

   const modal = document.querySelector(modalSelector);

   


   const modalTrigger = document.querySelectorAll('[data-modal]');



   modalTrigger.forEach(btn => {
      btn.addEventListener('click', () => openModal('.modal', modalTimerId));
   });


   modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.getAttribute('data-close') == "") {
         closeModal('.modal');
      }
   });

   document.addEventListener('keydown', (e) => {
      if (e.code === "Escape" && modal.classList.contains('show')) {
         closeModal('.modal');
      }
   });





   function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
         openModal('.modal', modalTimerId);
         window.removeEventListener('scroll', showModalByScroll);
      }
   }
   window.addEventListener('scroll', showModalByScroll);

}



export default modal;
export { openModal, closeModal };

