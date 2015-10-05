import Matrix from './Matrix'
import MatrixActions from './MatrixActions'
import MatrixResizeControlLeft from './MatrixResizeControlLeft'
import MatrixResizeControlTop from './MatrixResizeControlTop'
import MatrixResizeControlTopLeft from './MatrixResizeControlTopLeft'

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
        var horizontalResize = new MatrixResizeControlLeft($('<div class="table__resize_hor"></div>'))
        var verticalResize = new MatrixResizeControlTop($('<div class="table__resize_vert"></div>'))
        var diagonalResize = new MatrixResizeControlTopLeft($('<div class="table__resize_diag"></div>'))
        this.$table
            .append(diagonalResize.$item)
            .append(verticalResize.$item)
            .append(horizontalResize.$item);
    }

    static showError($element) {
        $element.parent().addClass('error');
    }

    static clearError($element) {
        $element.parent().removeClass('error');
    }
}

export default InputMatrix
