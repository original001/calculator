import MatrixResizeControl from './MatrixResizeControl'
import config from './config'

export default class MatrixResizeControlTop extends MatrixResizeControl {
    _onMouseDown(){
        this._top = this.$item.position().top;
        this.$item.css('top', this._top);

        this._absTop = this.$item.offset().top
    }
    _onMouseMove(evt){
        var shiftY = evt.clientY - this._absTop;

        var edgeMatrixCoord = (this.matrix.height - 1) * config.cell_size;

        if (shiftY < - edgeMatrixCoord + config.resize_tollerance) {
            this.rows = - edgeMatrixCoord/config.cell_size;
            this.$item.css('top', this._top - edgeMatrixCoord);
            return;
        } 

        this.$item.css('top',this._top + shiftY);

        if (Math.abs(shiftY) < config.resize_tollerance) {
            this.rows = 0
        } else if (shiftY < 0) {
            this.rows = Math.ceil((shiftY + config.resize_tollerance)/config.cell_size) - 1
        } else {
            this.rows = Math.ceil((shiftY - config.resize_tollerance)/config.cell_size)
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