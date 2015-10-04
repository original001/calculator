import Select from './Select'

const OPERATORS = {
    '+':'sum',
    '-':'minus',
    '*':'multi'
};

export default class Operator {
    constructor(symbol){
        this._functionName = OPERATORS[symbol];
        this._$wrapper = $('<div class="operator"></div>');
        this._$symbol = $('<div class="operator__symbol" ><i class="operator__symbol-icon"></i></div>');
        this._$caret = $('<div class="operator__caret"><i class="fa fa-caret-down"></i></div>');

        this._attachEvents();
    }
    get functionName(){
        return this._functionName;
    }

    _attachEvents(){
        this._$wrapper.on('click',()=>{
            this._showListOperators()
        });
        this._$symbol.on('change',(evt, value)=>{
            this._functionName = value;
            this._update();
        })
    }
    _update(){
        this._$symbol
            .attr('data-value',this._functionName)
            .children('i')
            .removeClass()
            .addClass('operator__symbol-icon operator__symbol-icon_'+this._functionName+'');

    }
    _showListOperators(){
        var operatorsArray = [];
        for (let operator in OPERATORS) {
            if (!OPERATORS.hasOwnProperty(operator)) continue;
            let value = OPERATORS[operator];
            let symbol = this._$symbol
                .clone()
                .attr('data-value',value)
                .children('i')
                .removeClass()
                .addClass('operator__symbol-icon operator__symbol-icon_'+value+'')
                .end();
            operatorsArray.push(symbol);
        }

        new Select({$wrapper: this._$wrapper, $element: this._$symbol, list: operatorsArray}).create();
    }
    
    get view(){
        this._update();

        return this._$wrapper
            .empty()
            .append(this._$symbol)
            .append(this._$caret);
    }
}