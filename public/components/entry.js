import bowser from 'bowser'

let htmlClasses = [];

if (bowser.msie)
    htmlClasses
        .push('ie')
        .push(`ie${bowser.version}`);

document.documentElement.className = htmlClasses.join(' ');

import './matrix/index'

import '../styles/main.less'