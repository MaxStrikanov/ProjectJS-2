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
    slider.addEventListener('mouseout', (e) => {
     if(e.target.matches('.portfolio-btn') || 
     e.target.matches('.dot')){
       startSlide();
     }
   });
   
    startSlide(1500);  
 
};


export {slider, addDots};
