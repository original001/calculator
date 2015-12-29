import Matrix from './Matrix'
import MatrixActions from './MatrixActions'
import MatrixResizeTrigger from './MatrixResizeTrigger'
import Menu from './Menu'

class InputMatrix extends Matrix {
    _attachEvents() {
        super._attachEvents();

        this._menu.view.on('change.menu', ()=>{
            this._triggerAction();
        });

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
            this.validate() ? MatrixActions.matrixValid() : MatrixActions.matrixValid();
        });

    }

    _init(){
        super._init();

        this._menu = new Menu();

        this.$table
            .prepend(new MatrixResizeTrigger(this, config.resizerTypes.diagonal).$item)
            .prepend(new MatrixResizeTrigger(this, config.resizerTypes.vertical).$item)
            .prepend(new MatrixResizeTrigger(this, config.resizerTypes.horizontal).$item)
            .append(this._menu.view);
    }

    _triggerAction(){
        switch (this._menu.value) {
            case 'replace':
                this.transpanate();
                break;
            case 'equal':
                this.determinant();
                break;
            case 'erase':
                this.clear();
                break;
            case 'trash':
                this.remove();
                break;
        }
    }

    static showError($element) {
        $element.parent().addClass('error');
    }

    static clearError($element) {
        $element.parent().removeClass('error');
    }

    transpanate(){
        console.log('transpanate');
    }

    determinant(){
        console.log('determinant') 
    }

    remove(){
        console.log('remove')
    }

    clear(){
        console.log('clear')
    }

}

export default InputMatrix
