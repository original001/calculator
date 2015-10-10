import MatrixResizeControl from './MatrixResizeControl'

export default class MatrixResizeControlTop extends MatrixResizeControl {
    _onMouseDown(){
        this._top = this.$item.position().top;
        this.$item.css('top', this._top);

        this._absTop = this.$item.offset().top
    }
    _onMouseMove(evt){
        var shiftY = evt.clientY - this._absTop;

        if (this.resolveEdges('rows', shiftY, 'top', this._top)) return;

        this.$item.css('top',this._top + shiftY);

        this.resolveCount('rows',shiftY)
    }
    _onMouseUp(){
        this.$item.css('top','');

        this.resolveAdding('rows');
    }
}