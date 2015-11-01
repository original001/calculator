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
        this._$bg
            .add(this._$cross)
            .css({
                width: this.width * config.cell_size,
                height: this.height * config.cell_size
            })
            .appendTo(this._$wrapper);

        this._$wrapper.prependTo(this._$matrixWrapper);
    }

    destroy() {
        this._$wrapper.empty().remove();
    }

    show({shiftTop, shiftLeft}) {

    }
}