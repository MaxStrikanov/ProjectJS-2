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
    
    const menu = document.querySelector('menu');
    
    document.addEventListener( 'click', () => {

      let handleMenu = menu.classList.toggle('active-menu');

      if (event.target.closest('.menu')) handleMenu;
      if (!event.target.closest('a')) return;
      handleMenu;
    }); 
    
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

});
