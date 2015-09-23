import Calculation from './Calculation'
import Operator from './Operator'
import MatrixActions from './MatrixActions'
import InputMatrix from './InputMatrix'
import OutputMatrix from './OutputMatrix'

const DEFAULT_WIDTH = 4;
const DEFAULT_HEIGHT = 4;
const DEFAULT_OPERATOR = '+';

class MatrixControl {
    constructor(){
        this._operators = [];
        this._matrixes = [];
        this._$calcField = $('#calcField');
        this._$resultField = $('#resultField');
        this._$addButtton = $('#addButton');
        this._$button = $('#getResult');
        this._disabled = true;

        this._createStore();
        this._attachEvents();
    }
    init(){
        this._addMatrix();
    }
    _attachEvents(){
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
        var newOperator = new Operator(DEFAULT_OPERATOR);
        newOperator
            .create()
            .getHtml()
            .appendTo(this._$calcField);

        this._operators.push(newOperator);
    }
    _addMatrix(){
        var newMatrix = new InputMatrix(DEFAULT_WIDTH,DEFAULT_HEIGHT);
        newMatrix
            .create()
            .getHtml()
            .appendTo(this._$calcField);

        this._matrixes.push(newMatrix);

        if (this._matrixes.length <= 1){
            this._disable()
        } else {
            this._enable()
        }
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
            },
            onShowResultMatrix(result){
                _this._showResult(result)
            },
            onCalculate(){
                if (!this._disabled) _this._calc()
            }
        })
    }
    _showResult(result){
        let height = result.length;
        let width = result[0].length;
        new OutputMatrix(width, height)
            .create()
            .writeToTable(result)
            .getHtml()
            .appendTo(this._$resultField)
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
        var matrixesAsArray = [];
        var operatorsAsArray = [];
        this._matrixes.forEach((matrix)=>{
            matrixesAsArray.push(matrix.readFromTable())
        });
        this._operators.forEach((operator)=>{
            operatorsAsArray.push(operator.functionName)
        });
        this._$resultField.empty();
        new Calculation(matrixesAsArray, operatorsAsArray)
    }
}

export default new MatrixControl