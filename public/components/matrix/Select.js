export default class Select {
    constructor(options){
        this._$wrapper = options.$wrapper;
        this._$bindItem = options.$element;
        this._$selectWrapper = $('<div class="select"></div>');
        this._$selectItem = $('<div class="select__item"></div>');

        this._itemsList = options.list || [];

        this._fill();
    }

    _attachEvents(){
        //todo: close on body clicked

        this._$selectWrapper.on('click',(evt)=>{
            evt.stopPropagation()
        });
    }
    _detachEvents() {
        this._$selectWrapper.off('click');
    }
    create() {
        var top = this._$bindItem.position().top;
        this._$selectWrapper.css('top',top);

        this._attachEvents();

        return this._$selectWrapper
            .appendTo(this._$wrapper)
            .show()
            .addClass('show');
    }

    destroy() {
        this._$selectWrapper
            .hide()
            .remove();
        this._detachEvents();
    }

    _fill() {
        this._itemsList.forEach(($elem)=>{
            let $item = this._$selectItem
                .clone()
                .append($elem)
                .on('click',(evt)=>{
                    evt.stopPropagation();
                    let value = $elem.data().value;
                    this._$bindItem.trigger('change',[value]);
                    this.destroy();
                });
            this._$selectWrapper.append($item);
        });
    }
}
