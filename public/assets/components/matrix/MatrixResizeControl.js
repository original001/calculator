import MatrixActions from './MatrixActions'

const RESIZE_TOLLERANCE = 10;
const CELL_SIZE = 40;

export default class MatrixResizeControl {
    constructor($item){
        this.$item = $item
        this.rows = 0
        this.cols = 0

        this._attachEvents()
    }
    get resizeTollerance(){
        return RESIZE_TOLLERANCE
    }

    get cellSize(){
        return CELL_SIZE
    }
    _attachEvents(){
        this.$item.on('mousedown',evt=>{
            evt.preventDefault()

            this._onMouseDown();
            
            this._$table = this.$item.closest('.table');

            $(document).on('mousemove.resize',evt=>{
                evt.preventDefault();

                this._onMouseMove(evt);

                this._$table.addClass('add')

                // MatrixActions.resizeMatrix()

                // this._resize($target, left, shift);
            }); 
            $(document).one('mouseup',evt=>{
                // console.log(`add ${} cols, add ${} rows`)
                this._onMouseUp();

                this._$table.removeClass('add')

                $(document).off('mousemove.resize');
            })
        });
    }
    _onMouseDown(){}
    _onMouseMove(evt){}
    _onMouseUp(){}
}