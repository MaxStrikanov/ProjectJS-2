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

calcValid();

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

export default calc;