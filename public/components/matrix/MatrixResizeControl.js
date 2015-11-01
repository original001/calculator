import MatrixActions from './MatrixActions'

export default class MatrixResizeControl {
    constructor($item, matrix, type){
        this.$item = $item;
        this.matrix = matrix;
        this.type = type;
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

                var shift = {top:0,left:0};

                switch (this.type) {
                    case 'horizontal':
                        shift.left = evt.clientX;
                        break;
                    case 'vertical':
                        shift.top = evt.clientY;
                        break;
                    case 'diagonal':
                        shift.left = evt.clientX;
                        shift.top = evt.clientY;
                        break;
                }
                
                this._onMouseMove(shift);

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