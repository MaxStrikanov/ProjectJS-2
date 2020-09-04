window.addEventListener('DOMContentLoaded', function(){
  'use strict';

 
  const countTimer = (deadline) => {

    let timerHours = document.getElementById( 'timer-hours' );
    let timerMinutes = document.getElementById( 'timer-minutes' );
    let timerSeconds = document.getElementById( 'timer-seconds' );

   

    const getTimeRemaining = () => {

      let dateStop = new Date(deadline).getTime();
      let dateNow = new Date().getTime();
      let timeRemaining = ( dateStop - dateNow ) / 1000;
      let seconds = Math.floor( timeRemaining % 60 );
      let minutes = Math.floor(( timeRemaining / 60 ) % 60 );
      let hours = Math.floor( timeRemaining / 60 / 60 ) // %24;
      // let day = Math.floor( timeRemaining / 60 / 60 / 24 );

      return { timeRemaining, hours, minutes, seconds };

    }

    const addZero = (n) => { 
  
      let text = n < 10 ? '0'+ n : n;
      return text;

    }

    const updateClock = () => {

      let timer = getTimeRemaining();

      timerHours.textContent = timer.hours;
      timerMinutes.textContent = timer.minutes;
      timerSeconds.textContent = timer.seconds;

      if ( timer.timeRemaining > 0 ) {

        setInterval( updateClock, 1000 )

      }
      if ( timer.timeRemaining < 0 ) {

        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00'

      } else {

      timerHours.textContent = addZero(timer.hours);
      timerMinutes.textContent = addZero(timer.minutes);
      timerSeconds.textContent = addZero(timer.seconds);

      }
    }

   updateClock();

  }

  countTimer('3 September 2020')
 

//меню
const toggleMenu = () => {

  const btnMenu = document.querySelector('.menu');
  const menu = document.querySelector('menu');

  const handlerMenu = () => {
    menu.classList.toggle('active-menu');
  };

  btnMenu.addEventListener( 'click', () => {

    if (event.target.closest('.menu')) handlerMenu();
     
  }); 

  menu.addEventListener('click', () => {
  
    if (!event.target.matches('a')) return;
    handlerMenu();

  })
};

toggleMenu();
 
  //popup

  const togglePopup = () => {

    const popup = document.querySelector('.popup');
    const popupBtn = document.querySelectorAll('.popup-btn');
    const popupContent = document.querySelector('.popup-content');
    let count = 0;
    let animate;

    let showPopup = function() {

      animate = requestAnimationFrame(showPopup);
      count++

    if( count < 50 ){

      popupContent.style.top = count + 'px';
      popup.style.display = 'block';
    } else {
      cancelAnimationFrame(animate);
    }  
    if (window.matchMedia("(max-width: 768px)").matches) {
      cancelAnimationFrame(animate);
    } else {
      animate = requestAnimationFrame(showPopup);
    }
  }

    popupBtn.forEach((elem) => {
      elem.addEventListener('click', () => {animate = requestAnimationFrame(showPopup)});
    });

    popup.addEventListener('click', (e) => {
      let target = e.target;

      if(target.classList.contains('popup-close')){
        popup.style.display = 'none';

      } else {

         target = target.closest('.popup-content')
          if(!target){
            popup.style.display = 'none'
          }
      }
         
    });

  };

  togglePopup();

 //табы
 
 const tabs = () => {
   const tabHeader = document.querySelector('.service-header');
   const tab = tabHeader.querySelectorAll('.service-header-tab');
   const tabContent = document.querySelectorAll('.service-tab');

   const toggleTabContent = (index) => {

     for( let i = 0; i < tabContent.length; i++){

       if(index === i){

         tab[i].classList.add('active');
         tabContent[i].classList.remove('d-none');

       } else {

        tab[i].classList.remove('active');
        tabContent[i].classList.add('d-none');

       }
     }
   }
   
   tabHeader.addEventListener('click', (e) => {
     
      let target = e.target;
          target = target.closest('.service-header-tab');

       if (target){
        tab.forEach((item, i) => {
          if(item === target){
            toggleTabContent(i);
        }
       }); 
      } 
  });
 };

 tabs();

//добавление точки с классом dot
 const addDots =() => {

  const dotsGroup = document.querySelector('.portfolio-dots');
  const slideItems = document.querySelectorAll('li [alt=portfolio]');

  for( let i = 0; i < slideItems.length; i++ ){

    let sliderDot = document.createElement('li')
    sliderDot.className = 'dot';
    dotsGroup.appendChild(sliderDot)
     
  }  
  const addClass = () => {
    
    let addActiveDot = document.querySelectorAll('.dot')[0];
        addActiveDot.classList.add('dot-active');
  }
  addClass()
  
}
addDots();

//слайдер

 const slider = () => {
   const slide = document.querySelectorAll('.portfolio-item');
   const dot = document.querySelectorAll('.dot'); 
   const slider = document.querySelector('.portfolio-content');
   
   let currentSlider = 0;
   let interval;
   
   const prevSlide = (elem, index, strClass) => {
    elem[index].classList.remove(strClass);
   }

   const nextSlide = (elem, index, strClass) => {
    elem[index].classList.add(strClass);
   }

   const startSlide = (time = 3000) => {
    interval = setInterval(autoPlaySlide, time)
   }
  
   const stopSlide = () => {  
     clearInterval(interval);
   }

   const autoPlaySlide = () => {

    prevSlide(slide, currentSlider, 'portfolio-item-active');
    prevSlide(dot, currentSlider, 'dot-active');
    currentSlider++
    if(currentSlider >= slide.length){
      currentSlider = 0;
    } 
    nextSlide(slide, currentSlider, 'portfolio-item-active');
    nextSlide(dot, currentSlider, 'dot-active');

   };
   
   slider.addEventListener('mouseover', (e) => {
    if(e.target.matches('.portfolio-btn') || 
      e.target.matches('.dot')){
        stopSlide();
      }
   })

   slider.addEventListener('mouseout', (e) => {
    if(e.target.matches('.portfolio-btn') || 
    e.target.matches('.dot')){
      startSlide();
    }
  });
  
    startSlide();

   slider.addEventListener('click', (e) => {
     e.preventDefault();

     let target = e.target;

     if (!target.matches('.portfolio-btn, .dot'))

     prevSlide(slide, currentSlider, 'portfolio-item-active');
     prevSlide(dot, currentSlider, 'dot-active');

     if(target.matches('#arrow-right')){
       currentSlider++;

     }else if (target.matches('#arrow-left')){
       currentSlider--;

     }else if (target.matches('.dot')){
       dot.forEach((elem, index) => {

         if(elem === target){
           currentSlider = index;
         }
       });
     }
     if(
       currentSlider >= slide.length){
         currentSlider = 0;
       }
     if(currentSlider < 0){
       currentSlider = slide.length -1;
     }
     nextSlide(slide, currentSlider, 'portfolio-item-active');
     nextSlide(dot, currentSlider, 'dot-active');

   });

 };

 slider(1500);
 
});
