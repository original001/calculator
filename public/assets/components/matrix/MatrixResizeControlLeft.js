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
            console.log('do nothing')
        } else if (shift < 0) {
            console.log(`show red line for ${-this.cols} cols`);
        } else {
            console.log(`show green line for ${this.cols} cols`);
        }
    }
    _onMouseUp(){
        console.log('mouseUP')
    }
}