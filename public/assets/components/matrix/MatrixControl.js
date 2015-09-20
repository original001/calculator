import Operational from './Operational'
import Operator from './Operator'
import MatrixActions from './MatrixActions'
import OutputMatrix from './OutputMatrix'

class MatrixControl {
    constructor(matrixes, operator){
        this._operator = operator;
        this._matrixes = matrixes || [];
        this._$calcField = $('#calcField');
        this._$resultField = $('#resultField');
        this._$button = $('#getResult');
        this._disabled = false;

        this._init();
        this._createStore();
        this._attachEvents();
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
    _attachEvents(){
        //todo: enter key
        this._$button.on('click', ()=>{
            if (!this._disabled) this._calc()
        })
    }
    _disable(){
        this._$button.addClass('disabled');
        this._disabled = true
    }
    _enable(){
        this._$button.removeClass('disabled');
        this._disabled = false
    }
    _init(){
        this._matrixes.forEach((matrix) => {
            //todo: add operation
            matrix.create().getHtml().prependTo(this._$calcField)
        })
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

export default MatrixControl