import MatrixResizeControl from './MatrixResizeControl'
import config from './config'

export default class MatrixResizeControlLeft extends MatrixResizeControl {
    _onMouseDown(){
        this._left = this.$item.position().left;
        this.$item.css('left', this._left);

        this._absLeft = this.$item.offset().left
    }
    _onMouseMove(evt){
        var shiftX = evt.clientX - this._absLeft;

        var edgeMatrixCoord = (this.matrix.width - 1) * config.cell_size;

        if (shiftX < - edgeMatrixCoord + config.resize_tollerance) {
            this.cols = - edgeMatrixCoord/config.cell_size;
            this.$item.css('left', this._left - edgeMatrixCoord);
            return;
        } 

        this.$item.css('left', this._left + shiftX);

        if (Math.abs(shiftX) < config.resize_tollerance) {
            this.cols = 0
        } else if (shiftX < 0) {
            this.cols = Math.ceil((shiftX + config.resize_tollerance)/config.cell_size) - 1
        } else {
            this.cols = Math.ceil((shiftX - config.resize_tollerance)/config.cell_size)
        }

    }
    _onMouseUp(){
        this.$item.css('left','');
        
        if (this.cols > 0) {
            this.matrix.addCols(this.cols);
        } else if (this.cols < 0) {
            this.matrix.removeCols(-this.cols);
        }
    }
}