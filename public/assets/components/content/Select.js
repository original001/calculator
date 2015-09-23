class Select {
    constructor($wrapper, $element, data){
        this._$document = $('body');
        this._$wrapper = $wrapper;
        this._$bindItem = $element;
        this._$popupItem = $('<div class="select"></div>');

        this._data = data;

        this._init();
    }
    _init(){
        this._fill();
        this._excludeCurrent();
    }
    _attachEvents(){
        //this._$document.on('click.select',()=>{
        //   this.destroy();
        //});

        this._$popupItem.on('click',(evt)=>{
            evt.stopPropagation()
        })
    }
    _dettachEvents() {
        this._$document.off('click');
        this._$popupItem.off('click');
    }
    create() {
        var top = this._$bindItem.position().top;
        this._$popupItem.css('top',top);
        this._$popupItem.appendTo(this._$wrapper);
        this.show();
        return this
    }

    destroy() {
        this.close();
        this._$popupItem.remove();
        this._dettachEvents()

    }

    show() {
        this._$popupItem
            .show()
            .addClass('show');
        this._attachEvents()

    }

    close(){
        this._$popupItem.hide()
    }

    _fill() {
        this._data.forEach((elem)=>{
            var $item = $('<div class="select__item"></div>');
            $item.append(elem);
            this._$popupItem.append($item);
        });
        this._$items = this._$popupItem.children('.select__item');
    }

    _excludeCurrent() {

    }

}

export default Select
