class Matrix {
    constructor(width, height){
        this._width = width || 0
        this._height = height || 0
        this._array = null
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
        let $table = $('<div class="table" />')
        for (var i = 0; i < this._height; i++) {
            let $row = $('<div class="table__row" />')
            for (var j = 0; j < this._width; j++) {
                let $input = $('<input type="text" class="table__cell-input" />')
                let $cell = $('<div class="table__cell" />')
                $cell.append($input)
                $row.append($cell)
            };
            $table.append($row)
        };
        this.$table = $table
        this.$rows = $table.find('.table__row')
        this.$inputs = $table.find('.table__cell-input')
        this._attachEvents()
        return $table
    }
   
}

class FillableMatrix extends Matrix {
    _attachEvents(){
        this.$inputs.on('keyup',(evt)=>{
            this.validate($(evt.target))
        })
    }
    showError($element){
        $element.css('border','1px solid red')
    }
    validate($element){
        if (isNaN($element.val())) {
            this.showError($element)
        };
    }
}

class NotFillableMatrix extends Matrix {
    constructor(array){
        super()
        console.log(array)
        this.fill(array)
    }
    fill(array){
        this.setWidth(4)
        this.setHeight(4)
        console.log(array)
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
                        //todo: string to int
                        newArray[i][j] = matrix[i][j] + lastMatrix[i][j]
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

        this._init()
        this._attachEvents()
    }
    _attachEvents(){
        this._$button.on('click', (evt)=>{
            this._calc()
        })
    }
    _init(){
        this._matrixes.forEach(matrix => {
            matrix.create().appendTo(this._$calcField)
        })
    }
    _calc(){
        let matrixesAsArray = this._matrixes.map(matrix => {
            return matrix.readFromTable()
        })
        let operator = new Operator(this._operator).getValue()
        let array = Operational[operator](matrixesAsArray)
        new NotFillableMatrix(array).create().appendTo(this._$resultField)
    }
    sum(){}
}
let m1 = new FillableMatrix(3, 2)
let m2 = new FillableMatrix(3, 2)

let MainPage = new MatrixControl([m1,m2],"+")