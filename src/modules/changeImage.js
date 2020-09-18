
const changeImage = () => {
    const getImage = (e) => {


        let target = e.target
        const img = target.closest('.command__photo');
    
        if ( img ) {
        
          if (img.dataset.img) {
          [img.src, img.dataset.img] = [img.dataset.img, img.src];
          }
        }  
      };
    document.addEventListener('mouseover', getImage);
    document.addEventListener('mouseout', getImage);

}

export default changeImage;
  
  