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
 
});

const toggleMenu = () => {

  const btnMenu = document.querySelector('.menu');
  const menu = document.querySelector('menu');
  const closeBtn = document.querySelector('.close-btn');
  const menuItems = menu.querySelectorAll('ul > li');

  const handlerMenu = () => {

    menu.classList.toggle('active-menu');

  };

  btnMenu.addEventListener( 'click', handlerMenu ); 
  closeBtn.addEventListener( 'click', handlerMenu );
  menuItems.forEach( (elem) => elem.addEventListener('click', handlerMenu) )

};

toggleMenu();

//popup


const show = (speed)=> {

    let ID = setInterval(function() {
    if (popup.style.opacity >= 1 ) {
clearInterval(ID);
    }
    popup.style.opacity += 0.1;
    }, speed);
}

const togglePopup = () => {

  const popup = document.querySelector('.popup');
  const popupBtn = document.querySelectorAll('.popup-btn');
  const popupClose = document.querySelector('.popup-close');
  const popupContent = document.querySelector('.popup-content');
  let count = 0;
  let animate;

  let showPopup = function() {

    animate = requestAnimationFrame(showPopup);
    count++

  if( count < 100 ){
console.log(count);

    popupContent.style.marginTop = count + 'px';
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

  popupClose.addEventListener('click', () => {
    
    popup.style.display = 'none';
  })

};

togglePopup();
