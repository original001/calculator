import './styles/Dropdown.less'

export default class Dropdown {
    constructor({initial, list, size}) {
        /**
         * list of dropdown items
         * @param {Object} list
         * @usage {key:value, key1:value1, etc.}
         */

        this._list = [];

        _.forIn(list, (value, key) => {
            this._list.push({key: key, value: value});
        });

        /**
         * key of first element in dropdown && static element
         * @param {string} initial
         */

        this._initial = initial != null ? initial : _.first(this._list)['key'];

        this._size = size || 16;

        this._$wrapper = $('<div class="dropdown__wrapper"></div>');

        this._init();
        this._setInitialState();
        this._attachEvents();
    }

    _init() {
        this._$element = $('<div class="dropdown__item"></div>');

        this._$wrapper.append(this._$element);

        this._$popup = $('<div class="dropdown"></div>');

        this._fillPopup();

        $('body').append(this._$popup);
    }

    _fillPopup() {
        this._$popup.empty();

        let index = _.findIndex(this._list, {key: this._initial});

        let curValue = _.pullAt(this._list, index);
        this._list = _.union(curValue, this._list);

        this._list.forEach(obj => {
            this._$popup
                .append($('<div class="dropdown__item" data-key="' + obj.key + '"></div>').html(obj.value));
        });
    }

    _setInitialState() {
        var obj = _.find(this._list, {key: this._initial});

        this._value = obj.key;

        this._$element.html(obj.value);
    }

    _attachEvents() {
        var _this = this;

        $(document).click(() => {
            this._hide();
        });

        this._$element.click(evt => {
            evt.stopPropagation();
            this.open();
        });

        this._$popup.on('click', '.dropdown__item', function () {
            var key = $(this).attr('data-key');
            _this._setValue(key)
        });
    }

    open() {
        var left = this._$element.offset().left;
        var top = this._$element.offset().top;
        var width = this._$wrapper.width();

        this._$popup.css({
            left,
            top,
            width
        });

        this._$popup
            .addClass('show');
    }

    _hide() {
        this._$popup
            .removeClass('show');
    }

    _setValue(key) {
        this._value = key;

        this._$wrapper.trigger('change.dropdown');
    }

    get view() {
        return this._$wrapper
    }

    get value() {
        return this._value
    }

}
