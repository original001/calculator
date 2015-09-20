class Operator {
    constructor(symbol){
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
}

export default Operator