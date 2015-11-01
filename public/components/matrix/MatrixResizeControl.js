import MatrixActions from './MatrixActions'
import ResizeHelper from './ResizeHelper'

export default class MatrixResizeControl {
    constructor(matrix, type){
        this.$item = $(`<div class="table__resize_${type}" />`);
        this.matrix = matrix;
        this.type = type;

        this._attachEvents();
    }

    _attachEvents(){
        this.$item.on('mousedown',evt=>{
            evt.preventDefault();

            this.onMouseDown();

            this.resizeHelper = new ResizeHelper(this.matrix);
            
            this._$table = this.$item.closest('.table');

            $(document).on('mousemove.resize',evt=>{
                evt.preventDefault();

                var shift = {top:null,left:null};

                switch (this.type) {
                    case config.resizerTypes.horizontal:
                        shift.left = evt.clientX;
                        break;
                    case config.resizerTypes.vertical:
                        shift.top = evt.clientY;
                        break;
                    case config.resizerTypes.diagonal:
                        shift.left = evt.clientX;
                        shift.top = evt.clientY;
                        break;
                }
                
                this.onMouseMove(shift);

                this._$table.addClass('add');
            });
            
            $(document).one('mouseup',()=>{
                this.onMouseUp();

                this._$table.removeClass('add');

                $(document).off('mousemove.resize');
            })
        });
    }
    onMouseDown(){}
    onMouseMove(){}
    onMouseUp(){}
}