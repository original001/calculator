import MatrixResizeControl from './MatrixResizeControl'

export default class MatrixResizeControlLeft extends MatrixResizeControl {
    _onMouseDown(){
        this._left = this.$item.position().left;
        this.$item.css('left', this._left);

        this._absLeft = this.$item.offset().left
    }
    _onMouseMove(evt){
        var shift = evt.clientX - this._absLeft;
        var edgeMatrixWidth = (this.matrix.width - 1) * MatrixResizeControl.cellSize

        if (shift < - edgeMatrixWidth + MatrixResizeControl.resizeTollerance) {
            this.cols = - edgeMatrixWidth/MatrixResizeControl.cellSize;
            this.$item.css('left',this._left - edgeMatrixWidth);
            return;
        }

        this.$item.css('left',this._left + shift)

        this.cols = Math.ceil(shift/MatrixResizeControl.cellSize)

        console.log(shift)

        if (Math.abs(shift) < MatrixResizeControl.resizeTollerance) {
            this.cols = 0
        } else if (shift < 0) {
            this.cols = Math.ceil(shift/MatrixResizeControl.cellSize) - 1
        } else {
            this.cols = Math.ceil(shift/MatrixResizeControl.cellSize)
        }
    }
    _onMouseUp(){
        this.$item.css('left','')
        if (this.cols > 0) {
            this.matrix.addCols(this.cols);
        } else if (this.cols < 0) {
            this.matrix.removeCols(-this.cols);
        }
    }
}