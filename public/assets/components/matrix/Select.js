import MatrixActions from './MatrixActions'

export default class Select {
    constructor($wrapper, $element, data){
        this._$document = $('body');
        this._$wrapper = $wrapper;
        this._$bindItem = $element;
        this._$selectWrapper = $('<div class="select"></div>');
        this._$selectItem = $('<div class="select__item"></div>');

        this._data = data;

        this._fill();
    }

    _attachEvents(){
        //todo: close on body clicked
        // this._$document.on('click.select',()=>{
        //    this.destroy();
        // });

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
        this._data.forEach(($elem)=>{
            let $item = this._$selectItem
                .clone()
                .append($elem)
                .on('click',(evt)=>{
                    evt.stopPropagation();
                    let value = $elem.data().value;
                    this._$bindItem.trigger('change',[value]);
                    this.destroy();
                })
            this._$selectWrapper.append($item);
        });
    }
}
