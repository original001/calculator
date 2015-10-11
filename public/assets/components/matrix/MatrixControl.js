import Calculation from './Calculation'
import Operator from './Operator'
import MatrixActions from './MatrixActions'
import InputMatrix from './InputMatrix'
import OutputMatrix from './OutputMatrix'

const DEFAULT_WIDTH = 4;
const DEFAULT_HEIGHT = 4;
const DEFAULT_OPERATOR = '+';

class MatrixControl {
    constructor() {
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

    init() {
        this._addMatrix();
    }

    _attachEvents() {
        this._$button.on('click', ()=> {
            if (!this._disabled) this._calculate()
        });
        this._$addButtton.on('click', ()=> {
            this._addOperation()
        })
    }

    _addOperation() {
        this._addOperator();
        this._addMatrix();
    }

    _addOperator() {
        var newOperator = new Operator(DEFAULT_OPERATOR);
        newOperator.view.appendTo(this._$calcField);

        this._operators.push(newOperator);
    }

    _addMatrix() {
        var newMatrix = new InputMatrix({width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT});
        newMatrix.view.appendTo(this._$calcField);

        this._matrixes.push(newMatrix);

        if (this._matrixes.length <= 1) {
            this._disable()
        } else {
            this._validateMatrixes()
        }
    }

    _createStore() {
        var _this = this;
        Reflux.createStore({
            listenables: MatrixActions,
            onMatrixError(){
                _this._disable()
            },
            onMatrixValid(){
                _this._validateMatrixes()
            },
            onShowResultMatrix(result){
                _this._showResult(result)
            },
            onCalculate(){
                if (!this._disabled) _this._calculate()
            },
            onCalculationError(errorMessage){
                alert(errorMessage)
            }
        })
    }

    _validateMatrixes(){
        this._matrixes.every(matrix => matrix.validate()) && this._enable()
    }

    _showResult(result) {
        /**
         * @input result
         * @description resulting matrix as array
         * @type Array
         */
        var height = result.length;
        var width = result[0].length;
        var outMatrix = new OutputMatrix({
            width: width,
            height: height,
            array: result
        });
        outMatrix.view.appendTo(this._$resultField.empty());
    }

    _disable() {
        this._$button.addClass('disabled');
        this._disabled = true
    }

    _enable() {
        this._$button.removeClass('disabled');
        this._disabled = false
    }

    _calculate() {
        var matrixesAsArray = this._matrixes.map(matrix => matrix.array);
        var operatorsAsArray = this._operators.map(operator => operator.functionName)
        new Calculation(matrixesAsArray, operatorsAsArray).run()
    }
}

export default new MatrixControl