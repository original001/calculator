import './styles/Dropdown.less'

export default class Dropdown {
    constructor({initial, list, size, orientation}) {
        this._initial = initial || 0;
        this._list = list || [];
        this._size = size || 16;
        this._orientation = orientation || 'vertical';

        this._$wrapper = $('<div class="dropdown__wrapper"></div>');
        this._init();
        this._setInitialState();
        this._attachEvents();
    }

    _init() {
        this._$element = $('<div class="dropdown__item"></div>');

        this._$popup = $('<div class="dropdown"></div>');

        this._fillPopup();

        this._$wrapper
            .append(this._$element)
            .append(this._$popup);
    }

    _fillPopup() {
        this._$popup.empty();

        var list = this._list.splice(this._initial, 1)[0];
        this._list.unshift(list);

        this._list.forEach((obj, ind) => {
            let value = Object.keys(obj)[0];

            this._$popup
                .append($('<div class="dropdown__item" data-value="' + ind + '"></div>').html(obj[value]));
        });
    }

    _setInitialState() {
        var value = this._list[parseInt(this._initial)];

        this._value = Object.keys(value)[0];

        this._$element.html(value[this._value]);
    }

    _attachEvents() {
        var _this = this;

        $(document).click(evt => {
            this._hide();
        });

        this._$element.click(evt => {
            evt.stopPropagation();
            this.open();
        });

        this._$popup.on('click', '.dropdown__item', function () {
            var ind = $(this).attr('data-value');
            _this._setValue(ind)
        });
    }

    open() {
        this._$popup
            .addClass('show');
    }

    _hide() {
        this._$popup
            .removeClass('show');
    }

    _setValue(ind) {
        var value = this._list[parseInt(ind)];

        this._value = Object.keys(value)[0];

        this._$wrapper.trigger('change.dropdown');
    }

    get view() {
        return this._$wrapper
    }

    get value() {
        return this._value
    }

}
