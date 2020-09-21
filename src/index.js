'use strict';

import "@babel/polyfill";
import "nodelist-foreach-polyfill";
import fetch from 'fetch-polyfill';
import 'formdata-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
fetch(window);

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import addDots from './modules/slider';
import slider from './modules/slider';
import changeImage from './modules/changeImage';
//import calcValid from './modules/calcValid';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

countTimer('31 September 2020')

toggleMenu();

togglePopup();

tabs();

addDots();

slider(1500);

changeImage();

calcValid();

calc(100);

sendForm();