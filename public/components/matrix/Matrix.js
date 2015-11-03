import MatrixActions from './MatrixActions'

export default class Matrix {
    constructor({width, height}) {
        this._width = width || 1;
        this._height = height || 1;

        this.$wrapper = $('<div class="wrapper-table" ></div>');
        this.$matrixSize = $(`<div class="table__size" >${this._width} x ${this._height}</div>`);

        this._init();
        this._updateState();
    }

    _init() {
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
        this.$wrapper
            .append(this.$matrixSize)
            .append($bracketRight)
            .prepend($bracketLeft);
    }

    _updateState(){
        this.$rows = this.$table.find('.table__row');
        this.$inputs = this.$table.find('.table__cell-input');
        this._attachEvents();
        this._width = this.$rows.first().children().length;
        this._height = this.$rows.length
    }

    _attachEvents() {}

    get width(){
        return this._width;
    }

    get height(){
        return this._height;
    }

    get array() {
        return this._readFromTable()
    }

    get view() {
        return this.$wrapper;
    }

    addRows(rows){
        for (var i = 0; i < rows; i++) {
            var $row = $('<div class="table__row" />');
            for (var j = 0; j < this._width; j++) {
                let $input = $('<input type="text" class="table__cell-input" />');
                let $cell = $('<div class="table__cell" />');
                $cell.append($input);
                $row.append($cell)
            }
            this.$table.append($row)
        }
        this._updateState();
    }

    removeRows(rows){
        while (rows-- >= 1){
            //todo: detach rows
            this.$table.find('.table__row').last().remove()
        }
        this._updateState();
    }

    addCols(cols){
        for (var i = 0; i < cols; i++) {
            this.$rows.each(function(){
                let $input = $('<input type="text" class="table__cell-input" />');
                let $cell = $('<div class="table__cell" />');
                $cell.append($input);
                var $this = $(this).append($cell)
            })
        }
        this._updateState();
    }

    removeCols(cols){
        if (this.$rows.first().find('.table__cell').length < 2) return;
        for (var i = 0; i < cols; i++) {
            this.$rows.each(function(){
                $(this).find('.table__cell').last().remove()
            })
        }
        this._updateState();
    }

    validate() {
        var array = this._readFromTable();
        return _.every(array, row => _.every(row, cell => !isNaN(cell)))
    }

    changeSize(colsToAdd, rowsToAdd){
        this.$matrixSize.text(`${this._width + colsToAdd} x ${this._height + rowsToAdd}`);
    }

    _readFromTable() {
        var array = [];
        this.$rows.each((ind, row)=> {
            let subArray = [];
            $(row).find(this.$inputs).each((ind, input)=> {
                subArray.push($(input).val())
            });
            array.push(subArray)
        });
        return array;
    }
}
