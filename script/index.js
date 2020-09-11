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

     if (!target.matches('.portfolio-btn, .dot')){
       return;
     }

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

//смена картинок
 const changeImage = (e) => {


  let target = e.target
  const img = target.closest('.command__photo');

  if ( img ) {

    if (img.dataset.img) {
    [img.src, img.dataset.img] = [img.dataset.img, img.src];
    }
  }  
};

document.addEventListener('mouseover', changeImage);
document.addEventListener('mouseout', changeImage);


  const calcValid = () => {

    const calcBlock = document.querySelector('.calc-block');

    calcBlock.addEventListener('input', (e) => {

      let target = e.target;
      let calcInput = target.closest('.calc-item [type=text]');
      let text = calcInput.value;
      let reg = /\D/g;

      if (reg.test(text)){

        calcInput.style.border = '1px solid red';
        text = text.replace(reg, '');
        calcInput.value = text; 

      } else {

        calcInput.style.border = '';

      }
    }
    
  )};

//calcValid();

//калькулятор
  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block');
    const calcType = document.querySelector('.calc-type');
    const calcSquare = document.querySelector('.calc-square');
    const calcCount = document.querySelector('.calc-count');
    const calcDay = document.querySelector('.calc-day');
    const totalValue = document.getElementById('total');

    
    const countSum = () => {

      let total = 0;
      const time = 5000;
      const step = 20;
      let n = 0;
      let t = Math.round( time / (total / step) );
      let countValue = 1;
      let dayValue = 1;
      let typeValue = calcType.options[calcType.selectedIndex].value;
      let squareValue = +calcSquare.value;

      if(calcCount.value > 1){
        countValue += (calcCount.value  - 1) / 10;
      }

      if(calcDay.value && calcDay.value < 5){
        dayValue *= 2
      } else if (calcDay.value && calcDay.value < 10){
        dayValue *= 1.5
      }

      if(typeValue && squareValue){

        let interval = setInterval(() => {
          n = n + step;
          if (n == total) {
            clearInterval(interval)
          }
          totalValue.textContent = n;
        }, t)
        total = price * typeValue * squareValue * countValue * dayValue;
      }
      
     totalValue.textContent = total;

      
      
    };

    calcBlock.addEventListener('change', (e) => {
      let target = e.target;

      // if(target.matches('.calc-type') || target.matches('.calc-square') ||
      //   target.matches('.calc-count') || target.matches('.calc-day')){

      //   }

      // if(target === calcType || target === calcSquare ||
      //   target === calcCount || target === calcDay){
      //   countSum()
      // }

      if(target.matches('select') || target.matches('input')){
          countSum()
        }
    })

    

  }
calc(100);

});


