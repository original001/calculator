import Select from './Select'
import MatrixActions from './MatrixActions'

const OPERATORS = {
    '+':'sum',
    '-':'minus',
    '*':'multi',
    '/':'devide'
}

export default class Operator {
    constructor(symbol){
        this._functionName = OPERATORS[symbol];
        this._$wrapper = $('<div class="operator"></div>');
        this._$symbol = $('<div class="operator__symbol" ><i class="operator__symbol-icon"></i></div>');
        this._$caret = $('<div class="operator__caret"><i class="fa fa-caret-down"></i></div>');

        this._attachEvents();
    }
    _attachEvents(){
        this._$wrapper.on('click',()=>{
            this._showListOperators()
        })
        this._$symbol.on('change',(evt, value)=>{
            this.setValue(value);
            this._update();
        })
    }
    _update(){
        this._$symbol
            .attr('data-value',this.getValue())
            .children('i')
            .removeClass()
            .addClass('operator__symbol-icon operator__symbol-icon_'+this.getValue()+'');

    }
    _showListOperators(){
        var operatorsArray = [];
        for (let operator in OPERATORS) {
            if (!OPERATORS.hasOwnProperty(operator)) continue;
            let value = OPERATORS[operator]
            let symbol = this._$symbol
                .clone()
                .attr('data-value',value)
                .children('i')
                .removeClass()
                .addClass('operator__symbol-icon operator__symbol-icon_'+value+'')
                .end();
            operatorsArray.push(symbol);
        }

        new Select(this._$wrapper, this._$symbol, operatorsArray).create();
    }

    getValue(){
        return this._functionName;
    }
    setValue(value){
        this._functionName = value;
    }

    create(){
        this._update();

        return this._$wrapper
            .empty()
            .append(this._$symbol)
            .append(this._$caret);
    }
}