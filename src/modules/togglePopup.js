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

export default togglePopup;