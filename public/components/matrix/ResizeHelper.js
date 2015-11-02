import '../../styles/ResizeHelper.less'

export default class ResizeHelper {
    constructor({width, height, $wrapper}) {
        this.width = width;
        this.height = height;
        this._$matrixWrapper = $wrapper;

        this._$wrapper = $('<div class="resize-helper" />');
        this._$bg = $('<div class="resize-helper__bg" />');
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

    show(colsToAdd, rowsToAdd) {
        if (colsToAdd < 0) {
            this._$cross
                .add(this._$add)
                .width((this.width + colsToAdd) * config.cell_size);
        } else if (colsToAdd > 0) {
            this._$add.width((this.width + colsToAdd) * config.cell_size)
        } else {
            this._$cross
                .add(this._$add)
                .width(this.width * config.cell_size)
        }

        if (rowsToAdd < 0) {
            this._$cross
                .add(this._$add)
                .height((this.height + rowsToAdd) * config.cell_size);
        } else if (rowsToAdd > 0) {
            this._$add.height((this.height + rowsToAdd) * config.cell_size)
        } else {
            this._$cross
                .add(this._$add)
                .height(this.height * config.cell_size)
        }
    }
}