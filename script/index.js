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
      let time = 100;
      let step = 200;
      let n = 0;
      
      let countValue = 1;
      let dayValue = 1;
      let typeValue = calcType.options[calcType.selectedIndex].value;
      let squareValue = +calcSquare.value;
      // if(calcSquare.value && calcSquare.value >= 100 && calcSquare.value <= 999){
      //   step = 500;
      // } else if (calcSquare.value && calcSquare.value >= 1000 && calcSquare.value <= 9999){
      //   step = 2000;  
      // } else if (calcSquare.value && calcSquare.value >= 10000) {
      //   step = 10000;  
      // } else if (calcDay.value && calcDay.value == 0){
      //   total = 0; 
      // }
      if(calcCount.value > 1){
        countValue += (calcCount.value  - 1) / 10;
      }

      if(calcDay.value && calcDay.value < 5 && calcDay.value > 1){
        dayValue *= 2
      } else if (calcDay.value && calcDay.value < 10){
        dayValue *= 1.5
      } else if (calcDay.value && calcDay.value == 0){
        dayValue = 0
      }
      
      if(typeValue && squareValue){

        // let t = Math.floor( time / (total / step) );
        // let interval = setInterval(() => {
          
        //   n = n + step;
        //   if (n === total) {
        //     clearInterval(interval)
        //   }
        //   totalValue.textContent = n;
        // }, t)

        total = price * typeValue * squareValue * countValue * dayValue;
      }
    if(calcDay.value && calcDay.value == '') {
      countValue = 1;
      dayValue = 1;
    }
    if (calcDay.value && calcDay.value == 0 && calcCount.value == 0){
      total = 0
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

//отправка формы
  const sendForm = () => {
    const errorMessage = 'Что-то пошло не так!';
    const loadMessage = 'Загрузка...';
    const successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
    const form = document.getElementById('form1');
    const formFooter = document.getElementById('form2');
    const formPopup = document.getElementById('form3');
    const btnSubmit = document.querySelectorAll('.form-btn');
    const statusMessage = document.createElement('div');
    const preloader = document.querySelector('.preloader');
    const formName = document.getElementById('form1-name');
    const formPhone = document.getElementById('form1-phone');
    const inputMsg = document.getElementById('form2-message');
    const inputName = document.getElementById('form2-name');
    const formFooterPhone = document.getElementById('form2-phone'); 
    statusMessage.style.cssText = 'font-size: 20px; color: #fff;';
    
    //только кириллица
    formName.addEventListener('input', () => {

      let textName = formName.value;
      const patternName = /^[a-zA-Z0-9\s]+$/i;

      if (patternName.test(textName)){
        textName = textName.replace(patternName, '');
        formName.style.border = '2px solid red';
        formName.value = textName; 
      } else {
        
        formName.style.border = '';
      
      }
    });
    inputMsg.addEventListener('input', () => {

    let textName = inputMsg.value;
    const patternName = /^[a-zA-Z0-9\s]+$/i;

    if (patternName.test(textName)){
      textName = textName.replace(patternName, '');
      inputMsg.style.border = '2px solid red';
      inputMsg.value = textName; 
    } else {
      
      inputMsg.style.border = '';
    
    }
    });
    inputName.addEventListener('input', () => {

    let textName = inputName.value;
    const patternName = /^[a-zA-Z0-9\s]+$/i;

    if (patternName.test(textName)){
      textName = textName.replace(patternName, '');
      inputName.style.border = '2px solid red';
      inputName.value = textName; 
    } else {
      
      inputName.style.border = '';
    
    }
    });

  //разрешен ввод только цифр и +
   formPhone.addEventListener('keydown', (e) => {
    
    if ( e.keyCode == 46 || e.keyCode == 8 || e.keyCode == 9 || e.keyCode == 27 ||
      (e.keyCode >= 35 && e.keyCode <= 39)) {
        
      return;
    } else {
      if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 107 )) {
        formPhone.style.border = 'solid red';
        event.preventDefault();
      } else {
        formPhone.style.border = '';
      }
    } 

   });
   formFooterPhone.addEventListener('keydown', (e) => {
    
    if ( formFooterPhone == 46 || e.keyCode == 8 || e.keyCode == 9 || e.keyCode == 27 ||
      (e.keyCode >= 35 && e.keyCode <= 39)) {
        
      return;
    } else {
      if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 107 )) {
        formFooterPhone.style.border = 'solid red';
        event.preventDefault();
      } else {
      formFooterPhone.style.border = '';
      }
    } 

   });

  const elemForm = [];
  for( const elem of form.elements){
    if (elem.tagName.toLowerCase() !== 'button' && 
    elem.type !== 'button'){
      elemForm.push(elem);
    }
    
  }

    const valid = (event) => {
      // const patternPhone = /\+?[78]([-()]*\d){10}$/;
      // const patternName = /^[а-яА-Я\s]+$/i;

      elemForm.forEach(elem => {
        if (!elem.value){
          elem.style.border = 'solid red';
          event.preventDefault();
        } else {
          form.appendChild(statusMessage);
          preloader.style.display = 'block';
          statusMessage.appendChild(preloader)
          const formData = new FormData(form);
    
          let body = {};

          formData.forEach((val, key) => {    
            body[key] = val;
          });
          postData(body, () => {
            statusMessage.textContent = successMessage;
          }, () => {
            statusMessage.textContent = errorMessage;
          });
          elem.style.border = 'solid red';
        }

      });
 
    }
    form.addEventListener('submit', valid);

    const elemFormFooter = [];
    for( const el of formFooter.elements){
    if (el.tagName.toLowerCase() !== 'button' && 
    el.type !== 'button'){
      elemFormFooter.push(el);
    }
  }

    const validFormFooter = (event) => {
      elemFormFooter.forEach( elem => {
        if(!elem.value){
          elem.style.border = 'solid red';
          event.preventDefault();
        } else {
          elem.style.border = '';
          
          formFooter.appendChild(statusMessage);
          preloader.style.display = 'block';
          statusMessage.appendChild(preloader)
          const formData = new FormData(formFooter);
          let body = {};
    
          formData.forEach((val, key) => {    
            body[key] = val;
          });
          postData(body, () => {
            statusMessage.textContent = successMessage;
          }, () => {
            statusMessage.textContent = errorMessage;
          });
          
        }

       
      })
    }

    formFooter.addEventListener('submit', validFormFooter);

    formPopup.addEventListener('submit', (e) => {
      e.preventDefault();
      formPopup.appendChild(statusMessage);
      statusMessage.textContent = loadMessage;
      const formData = new FormData(formPopup);
      let body = {};

      // for ( let val of formData.entries() ){
      //   body[val[0]] = val[1]
      // }

      formData.forEach((val, key) => {    
        body[key] = val;
      });
      postData(body, () => {
        statusMessage.textContent = successMessage;
      }, () => {
        statusMessage.textContent = errorMessage;
      });
      
    });

    const postData = (body, outputData, errorData) => {
      const request = new XMLHttpRequest();
      request.addEventListener('readystatechange' , () => {

        if (request.readyState !== 4){
          return
        }
        if (request.status === 200){
          outputData();
          setTimeout(() => {
            statusMessage.style.display = 'none'}, 3000); 
        } else {
          errorData(request.status)
          
        }
      });
      
      request.open('POST', './server.php');
      request.setRequestHeader('Content-Type', 'application/json');
     
      request.send(JSON.stringify(body))
    }
  };

  sendForm();

});


