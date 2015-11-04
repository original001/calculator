import '../../styles/ResizeHelper.less'

export default class ResizeHelper {
    constructor({width, height, view}) {
        this.width = width;
        this.height = height;
        this._$matrixWrapper = view;

        this._$wrapper = $('<div class="resize-helper" />');
        this._$addLayer = $('<div class="resize-helper__add" />');
        this._$removeLayer = $('<div class="resize-helper__remove" />');
        this._$crossLayer = $('<div class="resize-helper__cross" />');

        this._init();
    }

    _init() {
        this._$crossLayer
            .add(this._$removeLayer)
            .add(this._$addLayer)
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
        this._$crossLayer
            .add(this._$addLayer)
            .width(cols * config.cell_size);
    }

    _changeHeight(rows){
        this._$crossLayer
            .add(this._$addLayer)
            .height(rows * config.cell_size);
    }

    show(colsToAdd, rowsToAdd) {
        if (colsToAdd < 0) {
            this._changeWidth(this.width + colsToAdd);
        } else if (colsToAdd > 0) {
            this._$addLayer.width((this.width + colsToAdd) * config.cell_size)
        } else {
            this._changeWidth(this.width);
        }

        if (rowsToAdd < 0) {
            this._changeHeight(this.height + rowsToAdd);
        } else if (rowsToAdd > 0) {
            this._$addLayer.height((this.height + rowsToAdd) * config.cell_size)
        } else {
            this._changeHeight(this.height);
        }
    }
}