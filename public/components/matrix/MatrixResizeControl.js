import MatrixActions from './MatrixActions'

const RESIZE_TOLLERANCE = 10;
const CELL_SIZE = 40;

export default class MatrixResizeControl {
    constructor($item, matrix){
        this.$item = $item;
        this.matrix = matrix;
        this.rows = 0;
        this.cols = 0;

        this._attachEvents()
    }
    static get RESIZE_TOLLERANCE(){
        return RESIZE_TOLLERANCE
    }

    static get CELL_SIZE(){
        return CELL_SIZE
    }
    _attachEvents(){
        this.$item.on('mousedown',evt=>{
            evt.preventDefault();

            this._onMouseDown();
            
            this._$table = this.$item.closest('.table');

            $(document).on('mousemove.resize',evt=>{
                evt.preventDefault();

                this._onMouseMove(evt);

                this._$table.addClass('add');
            });
            $(document).one('mouseup',()=>{
                this._onMouseUp();

                this._$table.removeClass('add');

                $(document).off('mousemove.resize');
            })
        });
    }
    _onMouseDown(){}
    _onMouseMove(){}
    _onMouseUp(){}

    resolveEdges(element, shift, dir, position){
        var edgeMatrixCoord = (this.matrix[dir === 'left' ? 'width' : 'height'] - 1) * CELL_SIZE;

        if (shift < - edgeMatrixCoord + RESIZE_TOLLERANCE) {
            this[element] = - edgeMatrixCoord/CELL_SIZE;
            this.$item.css(dir, position - edgeMatrixCoord);
            return true;
        } 
    }

    resolveCount(element,shift){
        this[element] = Math.ceil(shift/CELL_SIZE);

        if (Math.abs(shift) < RESIZE_TOLLERANCE) {
            this[element] = 0
        } else if (shift < 0) {
            this[element] = Math.ceil(shift/CELL_SIZE) - 1
        } else {
            this[element] = Math.ceil(shift/CELL_SIZE)
        }
    }

    resolveAdding(elementsForAdding){
        var ElementsForAdding = `${elementsForAdding[0].toUpperCase()}${elementsForAdding.slice(1)}`
        if (this[elementsForAdding] > 0) {
            this.matrix[`add${ElementsForAdding}`](this[elementsForAdding]);
        } else if (this[elementsForAdding] < 0) {
            this.matrix[`remove${ElementsForAdding}`](-this[elementsForAdding]);
        }
    }
}