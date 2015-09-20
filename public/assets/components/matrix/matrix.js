class Matrix {
    constructor(width, height){
        this._width = width || 0;
        this._height = height || 0;
        this._array = null;
        this.$wrapper = $('<div class="wrapper-table" ></div>');
    }
    _attachEvents(){}
    getWidth(){return this._width }
    getHeight(){return this._height }
    setWidth(value){
        this._width = value
    }
    setHeight(value){
        this._height = value
    }
    setValue(array){
        this._array = array
    }
    getValue(){
        return this._array
    }
    getHtml(){
        return this.$wrapper
    }
    readFromTable(){
        var array = [];
        this.$rows.each((ind, row)=>{
            let subArray = [];
            $(row).find(this.$inputs).each((ind, input)=>{
                subArray.push($(input).val())
            });
            array.push(subArray)
        });
        this.setValue(array);
        return array
    }
    create(){
        var $bracketRight = $('<div class="table__brackets-r" />');
        var $bracketLeft = $('<div class="table__brackets-l" />');
        this.$table = $('<div class="table" />');
        for (var i = 0; i < this._height; i++) {
            let $row = $('<div class="table__row" />');
            for (var j = 0; j < this._width; j++) {
                let $input = $('<input type="text" class="table__cell-input" />');
                let $cell = $('<div class="table__cell" />');
                $cell.append($input);
                $row.append($cell)
            }
            this.$table.append($row).appendTo(this.$wrapper)
        }
        this.$wrapper.append($bracketRight).prepend($bracketLeft);
        this.$rows = this.$table.find('.table__row');
        this.$inputs = this.$table.find('.table__cell-input');
        this._attachEvents();
        return this
    }

}

export default Matrix