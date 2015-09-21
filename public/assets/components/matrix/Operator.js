class Operator {
    constructor(symbol){
        this._getOperator(symbol);
        this._$wrapper = $('<div class="operator"></div>');
        this._$symbol = $('<div class="operator__symbol" ></div>');

        this._attachEvents()
    }
    _attachEvents(){
        this._$wrapper.on('click',()=>{
            this._showListOperators()
        })
    }
    _showListOperators(){
        //todo:make popup
        this.functionName = 'multiply';
        this._$symbol.removeClass();
        this._$symbol.addClass('operator__symbol operator__symbol_'+this.functionName+'')
    }
    _getOperator(symbol){
        var operators = {
            '+':'sum',
            '-':'minus',
            '*':'multiply',
            '/':'divide'
        };
        if (operators[symbol] !== undefined) {
            this.functionName = operators[symbol]
        } else {
            throw new Error('Неизвестный оператор')
        }
    }
    getValue(){
        return this.functionName
    }
    create(){
        this._$symbol.addClass('operator__symbol_'+this.functionName+'');
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