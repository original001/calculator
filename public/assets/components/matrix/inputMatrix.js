import Matrix from './Matrix'
import MatrixActions from './MatrixActions'
import MatrixResizeControl from './MatrixResizeControl'

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
        var horizontalResize = new MatrixResizeControl({
            $item: $('<div class="table__resize_hor"></div>'),
            pos: 'left'
        }) 
        var verticalResize = new MatrixResizeControl({
            $item: $('<div class="table__resize_vert"></div>'),
            pos: 'top'
        }) 
        var diagonalResize = new MatrixResizeControl({
            $item: $('<div class="table__resize_diag"></div>'),
            pos: 'left-top'
        }) 
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
