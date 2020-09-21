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
  
export default toggleMenu;