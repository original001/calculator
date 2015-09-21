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
            this.functionName = operators[symbol]
        } else {
            throw new Error('Неизвестный оператор')
        }
    }
    getValue(){
        return this.functionName
    }
    create(){
        this._$wrapper.text(this.functionName);
        return this
    }
    getHtml(){
        return this._$wrapper
    }
}

export default Operator