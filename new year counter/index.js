'use strict'

let data = new Date();
let DayWeekRu = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
let dayWeek = DayWeekRu[data.getDay() - 1 ];
let day = data.getDate();
let time = data.toLocaleString('ru', {hour: '2-digit', minute: '2-digit', second: '2-digit'});
let hours = data.getHours();

const timesOfDay = (n) => {

    let text = n >= 0 && n <= 10 ? 'ое утро!' : 
               n > 10 && n <= 16 ? 'ый день!' :
               'ой ночи!';

    return text;
};

const hourFormat = (n) => {

  let pm =  n >= 0 && n <= 12  ? 'AM' : 'PM';
  return pm;   

}

const newYearCount = () => {
      
    let dateNY = new Date( '1 january 2021' ).getTime();
    let dateNow = new Date().getTime();
    let timeRemaining = Math.ceil(( dateNY - dateNow ) / ( 1000 * 60 *60 *24) );

    return timeRemaining;

}

const getTime = () => { 

    document.body.insertAdjacentHTML( 'beforeend', `
        <p>Добр${timesOfDay(hours)} </p>  
        <p>Сегодня: ${dayWeek}</p> 
        <p>Текущее время: ${time} ${hourFormat(hours)}</p>
        <p>До нового года осталось ${newYearCount()} дня</p> ` );    
}

getTime()

