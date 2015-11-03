import '../../styles/ResizeHelper.less'

export default class ResizeHelper {
    constructor({width, height, $wrapper}) {
        this.width = width;
        this.height = height;
        this._$matrixWrapper = $wrapper;

        //todo: rename blocks -> addBlock ex.
        this._$wrapper = $('<div class="resize-helper" />');
        this._$add = $('<div class="resize-helper__add" />');
        this._$remove = $('<div class="resize-helper__remove" />');
        this._$cross = $('<div class="resize-helper__cross" />');

        this._init();
    }

    _init() {
        this._$cross
            .add(this._$remove)
            .add(this._$add)
            .css({
                width: this.width * config.cell_size,
                height: this.height * config.cell_size
            })
            .appendTo(this._$wrapper);

        this._$matrixWrapper.prepend(this._$wrapper);
    }

    destroy() {
        this._$wrapper.empty().remove();
    }

    _changeWidth(cols){
        this._$cross
            .add(this._$add)
            .width(cols * config.cell_size);
    }

    _changeHeight(rows){
        this._$cross
            .add(this._$add)
            .height(rows * config.cell_size);
    }

    show(colsToAdd, rowsToAdd) {
        if (colsToAdd < 0) {
            this._changeWidth(this.width + colsToAdd);
        } else if (colsToAdd > 0) {
            this._$add.width((this.width + colsToAdd) * config.cell_size)
        } else {
            this._changeWidth(this.width);
        }

        if (rowsToAdd < 0) {
            this._changeHeight(this.height + rowsToAdd);
        } else if (rowsToAdd > 0) {
            this._$add.height((this.height + rowsToAdd) * config.cell_size)
        } else {
            this._changeHeight(this.height);
        }
    }
}