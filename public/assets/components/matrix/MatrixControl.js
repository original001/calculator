import Operational from './Operational'
import Operator from './Operator'
import MatrixActions from './MatrixActions'
import InputMatrix from './InputMatrix'
import OutputMatrix from './OutputMatrix'

const DEFAULT_WIDTH = 4;
const DEFAULT_HEIGHT = 4;
const DEFAULT_OPERATOR = '+';

class MatrixControl {
    constructor(){
        this._operator = '+';
        this._matrixes = [];
        this._$calcField = $('#calcField');
        this._$resultField = $('#resultField');
        this._$addButtton = $('#addButton');
        this._$button = $('#getResult');
        this._disabled = false;

        this._createStore();
        this._attachEvents();
    }
    init(){
        this._addMatrix();
    }
    _attachEvents(){
        //todo: enter key
        this._$button.on('click', ()=>{
            if (!this._disabled) this._calc()
        });
        this._$addButtton.on('click', ()=>{
           this._addOperation()
        })
    }
    _addOperation(){
        this._addOperator();
        this._addMatrix();
    }
    _addOperator(){
        new Operator(DEFAULT_OPERATOR)
            .create()
            .getHtml()
            .appendTo(this._$calcField);
    }
    _addMatrix(){
        new InputMatrix(DEFAULT_WIDTH,DEFAULT_HEIGHT)
            .create()
            .getHtml()
            .appendTo(this._$calcField)
    }
    _createStore(){
        var _this = this;
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
        _.every(this._matrixes, matrix=>{
            return _.every(matrix.$inputs, input =>{
                return !isNaN($(input).val())
            })
        }) && this._enable()
    }
    _disable(){
        this._$button.addClass('disabled');
        this._disabled = true
    }
    _enable(){
        this._$button.removeClass('disabled');
        this._disabled = false
    }

    _calc(){
        let matrixesAsArray = this._matrixes.map(matrix => {
            return matrix.readFromTable()
        });
        let operator = new Operator(this._operator).getValue();
        let array = Operational[operator](matrixesAsArray);
        let height = array.length;
        let width = array[0].length;
        new OutputMatrix(width, height)
            .create()
            .writeToTable(array)
            .getHtml()
            .appendTo(this._$resultField.empty())
    }
}

export default new MatrixControl