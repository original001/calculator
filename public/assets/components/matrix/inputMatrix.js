import Matrix from './Matrix'
import MatrixActions from './MatrixActions'

class InputMatrix extends Matrix {
    _attachEvents(){
        var _this = this;
        this.$inputs.on('keyup',function(){
            _this._validate($(this))
        })
    }
    _showError($element){
        $element.parent().addClass('error');
        MatrixActions.matrixError()
    }
    _clearError($element){
        $element.parent().removeClass('error');
    }
    _validate($element){
        if (isNaN($element.val())) {
            this._showError($element)
        } else {
            this._clearError($element);
            MatrixActions.matrixValid()
        }
    }
}

export default InputMatrix
