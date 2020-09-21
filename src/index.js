'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import {slider, addDots} from './modules/slider';
import changeImage from './modules/changeImage';
import {calc, calcValid} from './modules/calc';
import sendForm from './modules/sendForm';

countTimer('31 September 2020')

toggleMenu();

togglePopup();

tabs();

addDots();

slider();

changeImage();

calcValid();

calc();

sendForm();