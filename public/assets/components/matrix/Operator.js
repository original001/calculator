import Select from './../content/Select'

class Operator {
    constructor(symbol){
        this.functionName = Operator.getOperator(symbol);
        this._$wrapper = $('<div class="operator"></div>');
        this._$symbol = $('<div class="operator__symbol" ><i class="operator__symbol-icon"></i></div>');

        this._attachEvents()
    }
    _attachEvents(){
        this._$wrapper.on('click',()=>{
            this._showListOperators()
        })
    }
    _showListOperators(){
        //todo:composite operations
        new Select(this._$wrapper, this._$symbol,
            [Operator.getOperator('+'), Operator.getOperator('-'), Operator.getOperator('/'), Operator.getOperator('*')]).create().show();
    }
    static getOperator(symbol){
        var operators = {
            '+':'sum',
            '-':'minus',
            '*':'multiply',
            '/':'divide'
        };
        if (operators[symbol] !== undefined) {
            return operators[symbol]
        } else {
            throw new Error('Неизвестный оператор')
        }
    }
    getValue(){
        return this.functionName
    }
    create(){
        this._$symbol
            .attr('data-func',this.functionName)
            .children('i').addClass('operator__symbol-icon_'+this.functionName+'')
        var $caret = $('<div class="operator__caret"><i class="fa fa-caret-down"></i></div>');
        this._$wrapper
            .append(this._$symbol)
            .append($caret);
        return this
    }
    getHtml(){
        return this._$wrapper
    }
}

export default Operator