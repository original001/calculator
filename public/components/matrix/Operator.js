import Select from './Select'

import './styles/Operator.less'

import minusOperator from '../../img/operator-minus.png'
import multiOperator from '../../img/operator-multi.png'
import plusOperator from '../../img/operator-plus.png'

export default class Operator {
    constructor() {
        this._$element = $('<div class="operator"></div>');
        this._$caret = $('<div class="operator__caret"><i class="fa fa-caret-down"></i></div>');

        this._createList();
        this._init();
        this._attachEvents();
    }

    _attachEvents(){
        this._$caret.click(evt => {
            evt.stopPropagation();
            this._select.open();
        })
    }

    _createList() {
        var list = {
            '+': plusOperator,
            '*': multiOperator,
            '-': minusOperator
        };

        this._list = [];

        for (let img in list) {
            if (list.hasOwnProperty(img))
                this._list.push({[img]: `<img src="${list[img]}"/>`});
        }
    }

    _init() {
        this._select = new Select({list: this._list});

        this._$element
            .append(this._select.view)
            .append(this._$caret);
    }

    get function() {
        return config.operators[this._select.value];
    }

    get view() {
        return this._$element
    }
}