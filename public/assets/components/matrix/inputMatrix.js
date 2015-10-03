import Matrix from './Matrix'
import MatrixActions from './MatrixActions'

class InputMatrix extends Matrix {
    _attachEvents() {
        this.$inputs.on('keyup', (evt)=> {
            if (evt.keyCode === 13) {
                MatrixActions.calculate();
                return
            }
            this.validate();
        })
    }

    _showError($element) {
        $element.parent().addClass('error');
    }

    _clearError($element) {
        $element.parent().removeClass('error');
    }

    validate($element) {
        if (isNaN($element.val())) {
            this._showError($element)
        } else {
            this._clearError($element);
            MatrixActions.matrixValid()
        }
    }
}

export default InputMatrix
