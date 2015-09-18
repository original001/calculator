class Matrix {
    constructor(width, height){
        this._width = width || 0
        this._height = height || 0
        this._array = null
    }
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
        return $table
    }
   
}

class FillableMatrix extends Matrix {
    validate(){}
}

class NotFillableMatrix extends Matrix {
    constructor(array){
        super()
        this.fill(array)
    }
    fill(array){
        this.setWidth(4)
        this.setHeight(4)
        console.log(array)
    }
    
}

var Operational = {
    sum(matrixes){
        return []
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
        this._matrixes.map(matrix => {
            return matrix.getValue()
        })
        let operator = new Operator(this._operator).getValue()
        let array = Operational[operator](this._matrixes)
        new NotFillableMatrix(array).create().appendTo(this._$resultField)
    }
    sum(){}
}
let m1 = new FillableMatrix(4,3)
let m2 = new FillableMatrix(3,4)

let MainPage = new MatrixControl([m1,m2],"+")