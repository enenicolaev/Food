// Forms

import { closeModal, openModal } from "./modal";


function forms(formSelector) {

   const forms = document.querySelectorAll(formSelector);

   const message = {
      loading: 'icons/spinner.svg',
      success: 'Спасибо! Скоро мы с вами свяжемся',
      failure: 'Что-то пошло не так...'
   };


   //Функция отправки формы

   const postData = async (url, data) => { // ВНУТРИ АССИНХРОННЫЙ КОД
      const res = await fetch(url, {
         method: "POST",
         headers: {
            "Content-type": "application/json"
         },
         body: data,
      });

      return await res.json(); // Нужно вернуть промис!!!
   };


   forms.forEach( form => bindPostData(form) );



   function bindPostData(form) {
      form.addEventListener('submit', (e) => {
         e.preventDefault();

         let statusMessage = document.createElement('img');
         statusMessage.src = message.loading;
         statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
         `;
         form.insertAdjacentElement('beforeend', statusMessage);


         const formData = new FormData(form),
               json = JSON.stringify(Object.fromEntries(formData.entries()));


         postData("http://localhost:3000/requests", json)
            .then(response => {
               console.log(response);
               showThanksModal(message.success);
               statusMessage.remove();
            })
            .catch(() => {
               showThanksModal(message.failure);
            })
            .finally(() => {
               form.reset();
            });

      });
   }

   function showThanksModal(message) {
      const prevModalDialog = document.querySelector('.modal__dialog');

      prevModalDialog.classList.add('hide');

      const thanksModal = document.createElement('div');
      thanksModal.classList.add('modal__dialog');
      thanksModal.innerHTML = `
           <div class="modal__content">
               <div class="modal__close" data-close>×</div>
               <div class="modal__title">${message}</div>
           </div>
       `;
      openModal(".modal");
      document.querySelector('.modal').append(thanksModal);
      setTimeout(() => {
         thanksModal.remove();
         prevModalDialog.classList.add('show');
         prevModalDialog.classList.remove('hide');
         closeModal(".modal");
      }, 3000);
   }
}


export default forms;