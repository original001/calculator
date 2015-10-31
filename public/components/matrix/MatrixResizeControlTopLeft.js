import MatrixResizeControl from './MatrixResizeControl'
import config from './config'

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

        var edgeMatrixCoordY = (this.matrix.height - 1) * config.cell_size;

        if (shiftY < - edgeMatrixCoordY + config.resize_tollerance) {
            this.rows = - edgeMatrixCoordY/config.cell_size;
            this.$item.css('top', this._top - edgeMatrixCoordY);
            return;
        } 

        var edgeMatrixCoordX = (this.matrix.width - 1) * config.cell_size;

        if (shiftX < - edgeMatrixCoordX + config.resize_tollerance) {
            this.cols = - edgeMatrixCoordX/config.cell_size;
            this.$item.css('left', this._left - edgeMatrixCoordX);
            return;
        } 

        this.$item.css({
            top: this._top + shiftY,
            left: this._left + shiftX
        });

        if (Math.abs(shiftY) < config.resize_tollerance) {
            this.rows = 0
        } else if (shiftY < 0) {
            this.rows = Math.ceil((shiftY + config.resize_tollerance)/config.cell_size) - 1
        } else {
            this.rows = Math.ceil((shiftY - config.resize_tollerance)/config.cell_size)
        }

        if (Math.abs(shiftX) < config.resize_tollerance) {
            this.cols = 0
        } else if (shiftX < 0) {
            this.cols = Math.ceil((shiftX + config.resize_tollerance)/config.cell_size) - 1
        } else {
            this.cols = Math.ceil((shiftX - config.resize_tollerance)/config.cell_size)
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