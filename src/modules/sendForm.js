const sendForm = () => {
    const errorMessage = 'Что-то пошло не так!';
    const loadMessage = 'Загрузка...';
    const successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
    const statusMessage = document.createElement('div');
    const preloader = document.querySelector('.preloader');
    const forms = document.querySelectorAll('form');
    statusMessage.style.cssText = 'font-size: 20px; color: #fff;';
    console.log(forms);

    const onlyNumberInputs = document.querySelectorAll('input[type="tel"]');
    const onlyTextInputs = document.querySelectorAll('input[type="text"]');

    onlyNumberInputs.forEach((item) =>{
      item.addEventListener('input', function(){
        this.value = this.value.replace(/[^0-9\+]/, '');
         
    })
  });
  onlyTextInputs.forEach((item) =>{
      item.addEventListener('input', function(){
        this.value = this.value.replace(/[^А-я]/, '');
         
    })
  });
    
    forms.forEach(function(item){
      item.addEventListener('submit', send )
    });

    function send (event) {

      event.preventDefault();
      const formData = new FormData(this);
      const _this = this;
      let json = {};
      let state = null;

      _this.querySelectorAll('input').forEach((item) => {
        
        if(item.value === ''){
          item.style.border = 'solid red'
         return state = false;
          
        } else {
          item.style.border = '';
          return state = true;
          
        }
      })
      
      if(state){ 
        
        this.appendChild(statusMessage);
        preloader.style.display = 'block';
        statusMessage.appendChild(preloader)
        

      formData.forEach((value, key) => {
        json[key] = value;
      })

      postData(json, _this)
       .then((response) => {
          if ( response.status !== 200 ){
            throw new Error( 'status network not 200' );
          }
            statusMessage.textContent = successMessage;
            setTimeout(() => {statusMessage.style.display = 'none'}, 3000 ); 
            _this.querySelectorAll('input').forEach(item => {
              item.value = '';
              item.style.border = '';
            });
         
       })
       .catch((error) => {
          statusMessage.textContent = errorMessage;
          console.log(error);
       })
      }
    }

    const postData = (json,  _this) => {
      return fetch('./server.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
      });
    }
};

export default sendForm;

