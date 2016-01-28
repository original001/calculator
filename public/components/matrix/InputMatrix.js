import Matrix from './Matrix'
import MatrixActions from './MatrixActions'
import MatrixResizeTrigger from './MatrixResizeTrigger'
import DropdownMenu from './DropdownMenu';

class InputMatrix extends Matrix {
    _attachEvents() {
        super._attachEvents();

        this.$inputs.on('keyup change', (evt)=> {
            if (evt.keyCode === 13) {
                MatrixActions.calculate();
                return
            }
            var $target = $(evt.target);

            Matrix.resizeInput($target);

            if(isNaN($target.val())){
                MatrixActions.matrixError();
                InputMatrix.showError($target);
                return
            }
            InputMatrix.clearError($target);
            MatrixActions.matrixValid();
        });
    }

    _init(){
        super._init();

        this._select = new DropdownMenu({
            list: {
                // trans: 'transpose',
                multiNumber: 'multiplied by...',
                pow: 'degree of...',
                inverse: 'get inverse',
                det: 'get determinant',
                rank: 'get rank',
                
                clear: 'clear matrix',
                // remove: 'remove',
                random: 'fill by numbers'
            }
        });

        this.$menu.append(this._select.view)

        this.$table
            .prepend(new MatrixResizeTrigger(this, config.resizerTypes.diagonal).$item)
            .prepend(new MatrixResizeTrigger(this, config.resizerTypes.vertical).$item)
            .prepend(new MatrixResizeTrigger(this, config.resizerTypes.horizontal).$item)
    }


    static showError($element) {
        $element.parent().addClass('error');
    }

    static clearError($element) {
        $element.parent().removeClass('error');
    }

}

export default InputMatrix
