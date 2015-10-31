import MatrixActions from './MatrixActions'

export default class MatrixResizeControl {
    constructor($item, matrix){
        this.$item = $item;
        this.matrix = matrix;
        this.rows = 0;
        this.cols = 0;

        this._attachEvents()
    }

    _attachEvents(){
        this.$item.on('mousedown',evt=>{
            evt.preventDefault();

            this._onMouseDown();
            
            this._$table = this.$item.closest('.table');

            $(document).on('mousemove.resize',evt=>{
                evt.preventDefault();

                this._onMouseMove(evt);

                this._$table.addClass('add');
            });
            
            $(document).one('mouseup',()=>{
                this._onMouseUp();

                this._$table.removeClass('add');

                $(document).off('mousemove.resize');
            })
        });
    }
    _onMouseDown(){}
    _onMouseMove(){}
    _onMouseUp(){}
}