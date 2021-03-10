// Slider


function slider({wrapperSelector, fieldSelector, prevArrowSelector, nextArrowSelector, slideSelector, currentNumSelector, totalNumSelector}) {
   let slideIndex = 1,
      offset = 0; //Отсуп

   const slides = document.querySelectorAll(slideSelector),
      prev = document.querySelector(prevArrowSelector),
      next = document.querySelector(nextArrowSelector),
      total = document.querySelector(totalNumSelector),
      current = document.querySelector(currentNumSelector),
      slidesWrapper = document.querySelector(wrapperSelector),
      slidesField = document.querySelector(fieldSelector),
      width = window.getComputedStyle(slidesWrapper).width,
      dots = [];


   // to init it need to delete .offer__slider-inner si,ple slider with display: block; display: none
   function initSimpleSlider() {

      showSlides(slideIndex);

      if (slides.length < 10) {
         total.textContent = `0${slides.length}`;
      } else {
         total.textContent = slides.length;
      }

      function showSlides(n) {
         if (n > slides.length) {
            slideIndex = 1;
         }
         if (n < 1) {
            slideIndex = slides.length;
         }

         slides.forEach((item) => item.classList.remove("show"));

         slides[slideIndex - 1].classList.add("show");

         if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
         } else {
            current.textContent = slideIndex;
         }
      }

      function plusSlides(n) {
         showSlides(slideIndex += n);
      }

      prev.addEventListener('click', function () {
         plusSlides(-1);
      });

      next.addEventListener('click', function () {
         plusSlides(1);
      });

   }



   // Swiper with carousel
   function initComplexSwiper() {

      checkCurrentNum();

      slidesField.style.width = 100 * slides.length + '%';
      slidesField.style.display = 'flex';
      slidesField.style.transition = '0.5s all';

      slidesWrapper.style.overflow = 'hidden';

      slides.forEach(slide => {
         slide.style.width = width;
      });

      next.addEventListener('click', () => {
         if (offset == +width.replace(/\D/g, "") * (slides.length - 1)) {
            offset = 0;
         } else {
            offset += +width.replace(/\D/g, "");
         }

         slidesField.style.transform = `translateX(-${offset}px)`;

         if (slideIndex == slides.length) {
            slideIndex = 1;
         } else {
            slideIndex++;
         }

         if (slideIndex < 10) {
            current.textContent = `0${slideIndex}`;
         } else {
            current.textContent = slideIndex;
         }

         checkNavSlider();
      });

      prev.addEventListener('click', () => {
         if (offset == 0) {
            offset = +width.replace(/\D/g, "") * (slides.length - 1);
         } else {
            offset -= +width.replace(/\D/g, "");
         }

         slidesField.style.transform = `translateX(-${offset}px)`;

         if (slideIndex == 1) {
            slideIndex = slides.length;
         } else {
            slideIndex--;
         }

         if (slideIndex < 10) {
            current.textContent = `0${slideIndex}`;
         } else {
            current.textContent = slideIndex;
         }

         checkNavSlider();
      });
   }


   function checkCurrentNum() {

      if (slides.length < 10) {
         total.textContent = `0${slides.length}`;
      } else {
         total.textContent = slides.length;
      }

      if (slideIndex < 10) {
         current.textContent = `0${slideIndex}`;
      } else {
         current.textContent = slideIndex;
      }

   }


   initComplexSwiper();


   // slider Nav Pagination

   function initNavSlider(amount) {
      const slider = document.querySelector(".offer__slider"),
         indicators = document.createElement("ol");

      indicators.classList.add("carousel-indicators");

      slider.append(indicators);

      for (let i = 0; i < amount; i++) {
         const dot = document.createElement("li");
         dot.classList.add("dot");
         dot.setAttribute("data-slide-to", i + 1)
         indicators.append(dot)

         if (i == slideIndex - 1) {
            dot.style.opacity = 1;
         }

         dots.push(dot);


         dot.addEventListener("click", () => {
            offset = +width.replace(/\D/g, "") * i;
            slidesField.style.transform = `translateX(-${offset}px)`;

            slideIndex = i + 1;

            checkCurrentNum();

            checkNavSlider(dot, i);

         });

      }

   }

   function checkNavSlider(dot, i) {
      dots.forEach((dot, i) => {
         if (i == slideIndex - 1) {
            dot.style.opacity = "1";
         } else {
            dot.style.opacity = "0.5";
         }
      });
   }


   initNavSlider(slides.length);
}


export default slider;