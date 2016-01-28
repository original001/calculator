import MatrixActions from './MatrixActions'
import Calculation from './Calculation'

import './styles/Matrix.less'

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


        this.$menu = $(`<div class="table-menu"></div>`);

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
            .append(this.$menu)
            .prepend($bracketLeft);
    }

    _updateState(){
        this.$rows = this.$table.find('.table__row');
        this.$inputs = this.$table.find('.table__cell-input');
        this._attachEvents();
        MatrixActions.matrixValid();
        this._width = this.$rows.first().children().length;
        this._height = this.$rows.length
    }

    _attachEvents() {
        this.$menu.on('change.dropdown', ()=>{
            var value = this._select.value;
            if (this.__proto__[value])
                try {
                    this[value]();
                } catch (e) {
                    MatrixActions.error(e.message);
                }
        });
    }

    get width(){
        return this._width;
    }

    get height(){
        return this._height;
    }

    get array() {
        return this._readFromTable()
    }

    set array(array){
        this.$rows.each((indRow, row)=>{
            $(row).find(this.$inputs).each((indInput, input)=>{
                var value = _.round(array[indRow][indInput], config.PRECISION);
                $(input)
                    .val(value)
                    .trigger('change');
                Matrix.resizeInput($(input));
            })
        });
    }

    get view() {
        return this.$wrapper;
    }

    static resizeInput($cell){
        let text = $cell[0].value;
        if (text.length >= 4){
            if (text.length >= 6){
                $cell.css('font-size', 10);
            } else {
                $cell.css('font-size', 14);
            }
        } else {
            $cell.css('font-size', 18);
        }
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
        try {
            this._readFromTable();
        } catch (e) {
            return false
        }

        return true
    }

    changeSize(colsToAdd, rowsToAdd){
        this.$matrixSize.text(`${this._width + colsToAdd} x ${this._height + rowsToAdd}`);
    }

    trans(){
        console.log('transpanate');
    }

    det(){
        var det = Calculation.determinant(this.array);
        alert(det);
    }

    rank(){
        var rank = Calculation.rank(this.array);
        alert(rank);
    }

    remove(){
        console.log('remove')
    }

    clear(){
        this.$inputs
            .val('')
            .trigger('change');
    }

    inverse(){
        this.array = Calculation.inverse(this.array);
    }

    random() {
        this.array = Calculation.random(this.width, this.height);
    }

    pow() {
        this.array = Calculation.pow(this.array, prompt('Enter a positive integer', 1));
    }

    multiNumber() {
        this.array = Calculation.multiNumber(this.array, prompt('Enter a number', 1));
    }

    _readFromTable() {
        var array = [];
        this.$rows.each((ind, row)=> {
            let subArray = [];
            $(row).find(this.$inputs).each((ind, input)=> {
                var value = Number($(input).val());
                if (isNaN(value)) throw new Error('First correct all errors'); 
                subArray.push(value);
            });
            array.push(subArray)
        });
        return array;
    }
}
