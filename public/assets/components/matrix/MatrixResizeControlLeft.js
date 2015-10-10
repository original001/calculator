import MatrixResizeControl from './MatrixResizeControl'

export default class MatrixResizeControlLeft extends MatrixResizeControl {
    _onMouseDown(){
        this._left = this.$item.position().left;
        this.$item.css('left', this._left);

        this._absLeft = this.$item.offset().left
    }
    _onMouseMove(evt){
        var shiftX = evt.clientX - this._absLeft;

        if (this.resolveEdges('cols', shiftX, 'left', this._left)) return;

        this.$item.css('left', this._left + shiftX);

        this.resolveCount('cols',shiftX)

    }
    _onMouseUp(){
        this.$item.css('left','')
        this.resolveAdding('cols');
    }
}