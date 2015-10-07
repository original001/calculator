import MatrixResizeControl from './MatrixResizeControl'

export default class MatrixResizeControlLeft extends MatrixResizeControl {
    _onMouseDown(){
        this._top = this.$item.position().top;
        this.$item.css('top', this._top);

        this._absTop = this.$item.offset().top
    }
    _onMouseMove(evt){
        var shift = evt.clientY - this._absTop;
        var edgeMatrixHeight = (this.matrix.height - 1) * MatrixResizeControl.cellSize;

        if (shift < - edgeMatrixHeight + MatrixResizeControl.resizeTollerance) {
            this.rows = - edgeMatrixHeight/MatrixResizeControl.cellSize;
            this.$item.css('top',this._top - edgeMatrixHeight);
            return;
        }

        this.$item.css('top',this._top + shift);

        this.rows = Math.ceil(shift/MatrixResizeControl.cellSize);

        if (Math.abs(shift) < MatrixResizeControl.resizeTollerance) {
            this.rows = 0
        } else if (shift < 0) {
            this.rows = Math.ceil(shift/MatrixResizeControl.cellSize) - 1
        } else {
            this.rows = Math.ceil(shift/MatrixResizeControl.cellSize)
        }
    }
    _onMouseUp(){
        this.$item.css('top','');
        if (this.rows > 0) {
            this.matrix.addRows(this.rows);
        } else if (this.rows < 0) {
            this.matrix.removeRows(-this.rows);
        }
    }
}