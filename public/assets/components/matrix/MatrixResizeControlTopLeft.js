import MatrixResizeControl from './MatrixResizeControl'

export default class MatrixResizeControlTopLeft extends MatrixResizeControl {
    _onMouseDown(){
        this._top = this.$item.position().top;
        this._left = this.$item.position().left;

        this.$item.css({
            top: this._top,
            left: this._left
        });

        this._absLeft = this.$item.offset().left;
        this._absTop = this.$item.offset().top
    }
    _onMouseMove(evt){
        var shiftY = evt.clientY - this._absTop;
        var shiftX = evt.clientX - this._absLeft;

        var edgeMatrixHeight = (this.matrix.height - 1) * MatrixResizeControl.cellSize;
        var edgeMatrixWidth = (this.matrix.width - 1) * MatrixResizeControl.cellSize;

        if (shiftY < - edgeMatrixHeight + MatrixResizeControl.resizeTollerance) {
            this.rows = - edgeMatrixHeight/MatrixResizeControl.cellSize;
            this.$item.css('top',this._top - edgeMatrixHeight);
            return;
        } 

        if (shiftX < - edgeMatrixWidth + MatrixResizeControl.resizeTollerance) {
            this.cols = - edgeMatrixWidth/MatrixResizeControl.cellSize;
            this.$item.css('left',this._left - edgeMatrixWidth);
            return;
        }

        this.$item.css({
            top: this._top + shiftY,
            left: this._left + shiftX
        });

        this.rows = Math.ceil(shiftY/MatrixResizeControl.cellSize);
        this.cols = Math.ceil(shiftX/MatrixResizeControl.cellSize);

        if (Math.abs(shiftY) < MatrixResizeControl.resizeTollerance) {
            this.rows = 0
        } else if (shiftY < 0) {
            this.rows = Math.ceil(shiftY/MatrixResizeControl.cellSize) - 1
        } else {
            this.rows = Math.ceil(shiftY/MatrixResizeControl.cellSize)
        }

        if (Math.abs(shiftX) < MatrixResizeControl.resizeTollerance) {
            this.cols = 0
        } else if (shiftX < 0) {
            this.cols = Math.ceil(shiftX/MatrixResizeControl.cellSize) - 1
        } else {
            this.cols = Math.ceil(shiftX/MatrixResizeControl.cellSize)
        }
    }
    _onMouseUp(){
        this.$item.css({
            top: '',
            left: ''
        });
        if (this.rows > 0) {
            this.matrix.addRows(this.rows);
        } else if (this.rows < 0) {
            this.matrix.removeRows(-this.rows);
        }
        
        if (this.cols > 0) {
            this.matrix.addCols(this.cols);
        } else if (this.cols < 0) {
            this.matrix.removeCols(-this.cols);
        }
    }
}