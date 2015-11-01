import MatrixResizeControl from './MatrixResizeControl'
import config from './config'

export default class MatrixResizeTrigger extends MatrixResizeControl {
    onMouseDown(){
        this._top = this.$item.position().top;
        this._left = this.$item.position().left;
        this.colsToAdd = 0;
        this.rowsToAdd = 0;

        this.$item.css({
            top: this._top,
            left: this._left
        });

        this._absLeft = this.$item.offset().left;
        this._absTop = this.$item.offset().top
    }
    onMouseMove(shift){
        var shiftY = shift.top != null ? shift.top - this._absTop : 0;
        var shiftX = shift.left != null ? shift.left - this._absLeft : 0;

        this._calcVerticalCoord(shiftY);
        this._calcHorizontalCoord(shiftX)

    }

    _calcHorizontalCoord(shiftX){
        if (shiftX == null) return;

        var edgeMatrixCoordX = (this.matrix.width - 1) * config.cell_size;

        if (shiftX < - edgeMatrixCoordX + config.resize_tollerance) {
            this.colsToAdd = - edgeMatrixCoordX/config.cell_size;
            this.$item.css('left', this._left - edgeMatrixCoordX);
            return;
        }

        this.$item.css({left: this._left + shiftX});

        if (Math.abs(shiftX) < config.resize_tollerance) {
            this.colsToAdd = 0
        } else if (shiftX < 0) {
            this.colsToAdd = Math.ceil((shiftX + config.resize_tollerance)/config.cell_size) - 1
        } else {
            this.colsToAdd = Math.ceil((shiftX - config.resize_tollerance)/config.cell_size)
        }
    }

    _calcVerticalCoord(shiftY){
        if (shiftY == null) return;

        var edgeMatrixCoordY = (this.matrix.height - 1) * config.cell_size;

        if (shiftY < - edgeMatrixCoordY + config.resize_tollerance) {
            this.rowsToAdd = - edgeMatrixCoordY/config.cell_size;
            this.$item.css('top', this._top - edgeMatrixCoordY);
            return
        }

        this.$item.css({top: this._top + shiftY});

        if (Math.abs(shiftY) < config.resize_tollerance) {
            this.rowsToAdd = 0
        } else if (shiftY < 0) {
            this.rowsToAdd = Math.ceil((shiftY + config.resize_tollerance)/config.cell_size) - 1
        } else {
            this.rowsToAdd = Math.ceil((shiftY - config.resize_tollerance)/config.cell_size)
        }
    }

    onMouseUp(){
        this.$item.css({
            top: '',
            left: ''
        });

        if (this.rowsToAdd > 0) {
            this.matrix.addRows(this.rowsToAdd);
        } else if (this.rowsToAdd < 0) {
            this.matrix.removeRows(-this.rowsToAdd);
        }
        
        if (this.colsToAdd > 0) {
            this.matrix.addCols(this.colsToAdd);
        } else if (this.colsToAdd < 0) {
            this.matrix.removeCols(-this.colsToAdd);
        }
    }
}