class Operator {
    constructor(symbol){
        this._getOperator(symbol);
        this._$wrapper = $('<span class="operator"></span>')

    }
    _getOperator(symbol){
        var operators = {
            '+':'sum',
            '-':'minus',
            '*':'multiply',
            '/':'divide'
        };
        if (operators[symbol] !== undefined) {
            this._operator = operators[symbol]
        } else {
            throw new Error('Неизвестный оператор')
        }
    }
    getValue(){
        return this._operator
    }
    create(){
        this._$wrapper.text(this._operator);
        return this
    }
    getHtml(){
        return this._$wrapper
    }
}

export default Operator