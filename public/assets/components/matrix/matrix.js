class Matrix {
    constructor(options) {
        this._width = options.width || 0;
        this._height = options.height || 0;

        this.$wrapper = $('<div class="wrapper-table" ></div>');

        this._init();
        this._attachEvents();
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
        this.$wrapper.append($bracketRight).prepend($bracketLeft);
        this.$rows = this.$table.find('.table__row');
        this.$inputs = this.$table.find('.table__cell-input');
    }

    _attachEvents() {
    }

    get array() {
        return this._readFromTable()
    }

    get view() {
        return this.$wrapper;
    }

    validate() {
        var array = this._readFromTable();
        return _.every(array, row => {
            return _.every(row, cell => {
                return !isNaN(cell)
            })
        })
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

export default Matrix