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

        if (this.resolveEdges('rows', shiftY, 'top', this._top)) return;
        if (this.resolveEdges('cols', shiftX, 'left', this._left)) return;

        this.$item.css({
            top: this._top + shiftY,
            left: this._left + shiftX
        });

        this.resolveCount('rows',shiftY)
        this.resolveCount('cols',shiftX)
    }
    _onMouseUp(){
        this.$item.css({
            top: '',
            left: ''
        });

        this.resolveAdding('rows');
        this.resolveAdding('cols');
    }
}