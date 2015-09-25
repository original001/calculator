import Select from './Select'
import MatrixActions from './MatrixActions'

export default class Operator {
    constructor(symbol){
        this.operators = {
            '+':'sum',
            '-':'minus',
            '*':'multi',
            '/':'devide'
        };

        this._functionName = this.operators[symbol];
        this._$wrapper = $('<div class="operator"></div>');
        this._$symbol = $('<div class="operator__symbol" ><i class="operator__symbol-icon"></i></div>');

        this._attachEvents();
        this._createStore();
    }
    _attachEvents(){
        this._$wrapper.on('click',()=>{
            this._showListOperators()
        })
        this._$symbol.on('change',(evt, value)=>{
            this.setValue(value);
            this.create();
        })
    }
    _createStore(){
        var _this = this;
    }

    _showListOperators(){
        var operatorsArray = [];
        for (let operator in this.operators) {
            if (!this.operators.hasOwnProperty(operator)) continue;
            let value = this.operators[operator]
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
        this._$symbol
            .attr('data-value',this.getValue())
            .children('i')
            .removeClass()
            .addClass('operator__symbol-icon operator__symbol-icon_'+this.getValue()+'');
        var $caret = $('<div class="operator__caret"><i class="fa fa-caret-down"></i></div>');
        
        this._$wrapper
            .empty()
            .append(this._$symbol)
            .append($caret);

        this._attachEvents();

        return this._$wrapper
    }
}