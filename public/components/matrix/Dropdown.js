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

        this._initial = initial && list.hasOwnProperty(initial) ? initial : null;

        /**
         * popup width
         * @param {number} size
         */

        this._size = size || null;

        this._$element = $(`<div class="dropdown${this.prefix}__item"></div>`);
        this._$popup = $(`<div class="dropdown${this.prefix}"></div>`);

        this._init();
        this._setInitialState();
        this._attachEvents();
    }

    get prefix(){
        return '';
    }

    _init() {
        this._fillPopup();

        $('body').append(this._$popup);
    }

    _fillPopup() {
        this._$popup.empty();

        if (this._initial != null) {
            let index = _.findIndex(this._list, {key: this._initial});

            let curValue = _.pullAt(this._list, index);
            this._list = _.union(curValue, this._list);
        }

        this._list.forEach(({key, value}) => {
            this._$popup
                .append($(`<div class="dropdown${this.prefix}__item" data-key="${key}"/>`).html(value));
        });
    }

    _setInitialState() {
        if (this._initial == null) {
            var {key, value} = _.first(this._list);
        } else {
            var {key, value} = _.find(this._list, {key: this._initial});
        }

        this._value = key;

        this._$element.html(value);
    }

    _attachEvents() {
        var _this = this;

        $(document).on('click show.dropdown', () => {
            this._hide();
        });

        this._$element.click(evt => {
            evt.stopPropagation();
            this.open();
        });

        this._$popup.on('click', `.dropdown${this.prefix}__item`, function () {
            var key = $(this).attr('data-key');
            _this._setValue(key)
        });
    }

    open() {
        var left = this._$element.offset().left;
        var top = this._$element.offset().top;

        this._$popup.css({
            left,
            top,
            width: this._size
        });

        $(document).trigger('show.dropdown');

        this._$popup
            .addClass('show');
    }

    _hide() {
        this._$popup
            .removeClass('show');
    }

    _setValue(key) {
        this._value = key;

        this._$element.trigger('change.dropdown');
    }

    get view() {
        return this._$element
    }

    get value() {
        return this._value
    }

}
