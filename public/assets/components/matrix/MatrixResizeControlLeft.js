import MatrixResizeControl from './MatrixResizeControl'

export default class MatrixResizeControlLeft extends MatrixResizeControl {
    _onMouseDown(){
        this._left = this.$item.position().left;
        this.$item.css('left', this._left);

        this._absLeft = this.$item.offset().left
    }
    _onMouseMove(evt){
        var shift = evt.clientX - this._absLeft;

        this.$item.css('left',this._left + shift)

        this.cols = Math.ceil(shift/this.cellSize)

        if (Math.abs(shift) < this.resizeTollerance) {
            this.cols = 0
        } else if (shift < 0) {
            this.cols = Math.ceil(shift/this.cellSize) - 1
        } else {
            this.cols = Math.ceil(shift/this.cellSize)
        }
    }
    _onMouseUp(){
        this.$item.css('left','')
        console.log(`add ${this.cols} cols`)
    }
}