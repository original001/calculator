class Select {
    constructor($wrapper, $element, data){
        this._$wrapper = $wrapper;
        this._$bindItem = $element;
        this._$popupItem = $('<div class="select"></div>');

        this._data = data;

        this._init();
        this._attachEvents()
    }

    _attachEvents(){
        //todo: select item
        //todo: close onClick window
    }

    show() {
        this._$popupItem.show()
    }

    close(){
        this._$popupItem.hide()
    }

    _init(){
        this._setPosition();
        this._fill();
        this._create();
        this._excludeCurrent();
    }

    _setPosition() {
        var top = this._$bindItem.offset().top;
        this._$popupItem.top(top);
    }

    _fill() {
        this._data.forEach((elem)=>{
            var $item = $('<div class="select__item"></div>');
            $item.append(elem);
            this._$popupItem.append($item);
        })
        this._$items = this._$popupItem.children('.select__item');
    }

    _excludeCurrent() {

    }


    _create() {
        this._$popupItem.appendTo(this._$wrapper)
    }
}

export default Select
