import Matrix from './Matrix'
import MatrixActions from './MatrixActions'
import MatrixResizeTrigger from './MatrixResizeTrigger'

import config from './config';

class InputMatrix extends Matrix {
    _attachEvents() {
        this.$inputs.on('keyup change', (evt)=> {
            if (evt.keyCode === 13) {
                MatrixActions.calculate();
                return
            }
            var $target = $(evt.target);
            if(isNaN($target.val())){
                MatrixActions.matrixError();
                InputMatrix.showError($target);
                return
            }
            InputMatrix.clearError($target);
            this.validate() ? MatrixActions.matrixValid() : MatrixActions.matrixValid();
        });

    }

    _init(){
        super._init();

        this.$table
            .prepend(new MatrixResizeTrigger(this, config.resizerTypes.diagonal).$item)
            .prepend(new MatrixResizeTrigger(this, config.resizerTypes.vertical).$item)
            .prepend(new MatrixResizeTrigger(this, config.resizerTypes.horizontal).$item);
    }

    static showError($element) {
        $element.parent().addClass('error');
    }

    static clearError($element) {
        $element.parent().removeClass('error');
    }
}

export default InputMatrix
