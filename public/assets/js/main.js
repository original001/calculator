var MatrixActions = Reflux.createActions(['matrixError','matrixValid'])

class Matrix {
    constructor(width, height){
        this._width = width || 0
        this._height = height || 0
        this._array = null
        this.$wrapper = $('<div class="wrapper-table" />')
        this._isValid = true
    }
    _attachEvents(){}
    getWidth(){return this._width }
    getHeight(){return this._height }
    setWidth(value){
        this._width = value
    }
    setHeight(value){
        this._height = value
    }
    setValue(array){
        this._array = array
    }
    getValue(){
        return this._array
    }
    getHtml(){
        return this.$wrapper
    }
    readFromTable(){
        var array = []
        this.$rows.each((ind, row)=>{
            let subArray = []
            $(row).find(this.$inputs).each((ind, input)=>{
                subArray.push($(input).val())
            })
            array.push(subArray)
        })
        this.setValue(array)
        return array
    }
    create(){
        var $bracketRight = $('<div class="table__brackets-r" />')
        var $bracketLeft = $('<div class="table__brackets-l" />')
        this.$table = $('<div class="table" />')
        for (var i = 0; i < this._height; i++) {
            let $row = $('<div class="table__row" />')
            for (var j = 0; j < this._width; j++) {
                let $input = $('<input type="text" class="table__cell-input" />')
                let $cell = $('<div class="table__cell" />')
                $cell.append($input)
                $row.append($cell)
            };
            this.$table.append($row).appendTo(this.$wrapper)
        };
        this.$wrapper.append($bracketRight).prepend($bracketLeft)
        this.$rows = this.$table.find('.table__row')
        this.$inputs = this.$table.find('.table__cell-input')
        this._attachEvents()
        return this
    }

}

class InputMatrix extends Matrix {
    _attachEvents(){
        var _this = this
        this.$inputs.on('keyup',function(){
            _this._validate($(this))
        })
    }
    _showError($element){
        $element.css('border','1px solid red')
        this._isValid = false
        MatrixActions.matrixError()
    }
    _clearError($element){
        $element.css('border','none')
    }
    _validate($element){
        if (isNaN($element.val())) {
            this._showError($element)
        } else {
            this._clearError($element)
            MatrixActions.matrixValid()
        }
    }
}

class OutputMatrix extends Matrix {
    writeToTable(array){
        this.$rows.each((indRow, row)=>{
            $(row).find(this.$inputs).each((indInput, input)=>{
                $(input).val(array[indRow][indInput])
            })
        })
        return this
    }
}

var Operational = {
    sum(matrixesAsArray){
        var newArray = []
        matrixesAsArray.forEach((matrix, ind, matrixes)=>{
            var lastMatrix = matrixes[ind-1]
            if (ind !== 0 && matrix.length === lastMatrix.length 
                && matrix[0].length === lastMatrix[0].length) {
                for (var i = 0; i < matrix.length; i++) {
                    newArray[i] = []
                    for (var j = 0; j < matrix[i].length; j++) {
                        newArray[i][j] = +matrix[i][j] + +lastMatrix[i][j]
                    };
                };
            };
        })
        if (!newArray.length) throw new Error('Массивы разной величины или один массив')
        return newArray
    },
    multiply(){}
}

class Operator {
    constructor(symbol){
        var operators = {
            '+':'sum',
            '-':'minus',
            '*':'multiply',
            '/':'divide',
        } 
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

class MatrixControl {
    constructor(matrixes, operator){
        this._operator = operator
        this._matrixes = matrixes || []
        this._$calcField = $('#calcField')
        this._$resultField = $('#resultField')
        this._$button = $('#getResult')
        this._disabled = false

        this._init()
        this._createStore()
        this._attachEvents()
    }
    _createStore(){
        var _this = this
        Reflux.createStore({
            listenables:MatrixActions,
            onMatrixError(){
                _this._disable()
            },
            onMatrixValid(){
                _this._checkTables()
            }
        })        
    }
    _checkTables(){
        let isValid = true
        this._matrixes.forEach(matrix=>{
            matrix.$inputs.each((ind, input)=>{
                if (isNaN($(input).val())) {
                    isValid = false
                    return false
                }
            })
        })
        if (isValid) {
            this._enable()
        }
    }
    _attachEvents(){
        //todo: enter key
        this._$button.on('click', (evt)=>{
            if (!this._disabled) this._calc()
        })
    }
    _disable(){
        this._$button.addClass('disabled')
        this._disabled = true
    }
    _enable(){
        this._$button.removeClass('disabled')
        this._disabled = false
    }
    _init(){
        this._matrixes.forEach((matrix,ind) => {
            //todo: add operation
            matrix.create().getHtml().prependTo(this._$calcField)
        })
    }
    _calc(){
        let matrixesAsArray = this._matrixes.map(matrix => {
            return matrix.readFromTable()
        })
        let operator = new Operator(this._operator).getValue()
        let array = Operational[operator](matrixesAsArray)
        let height = array.length
        let width = array[0].length
        new OutputMatrix(width, height)
            .create()
            .writeToTable(array)
            .getHtml()
            .appendTo(this._$resultField.empty())
    }
}
let m1 = new InputMatrix(3, 2)
let m2 = new InputMatrix(3, 2)
//todo: 3 and more matrixes

let MainPage = new MatrixControl([m1,m2],"+")