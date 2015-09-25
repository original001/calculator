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
        // this._$document.on('click.select',()=>{
        //    this.destroy();
        // });

        this._$selectWrapper.on('click',(evt)=>{
            evt.stopPropagation()
        });
    }
    _detachEvents() {
        this._$document.off('click');
        this._$selectWrapper.off('click');
    }
    create() {
        var top = this._$bindItem.position().top;
        this._$selectWrapper.css('top',top);

        this._attachEvents()

        return this._$selectWrapper
            .appendTo(this._$wrapper)
            .show()
            .addClass('show');
    }

    destroy() {
        this.close();
        this._$selectWrapper.remove();
        this._detachEvents()

    }

    close(){
        this._$selectWrapper.hide()
    }

    _fill() {
        // var func = this._$bindItem.data().func;
        // this._data = _.difference(this._data, [func]);

        // let $item = this._$selectItem.clone().append(this._$bindItem.clone());
        // this._$selectWrapper.append($item);
        this._data.forEach(($elem)=>{
            let $item = this._$selectItem
                .clone()
                .append($elem)
                .on('click',()=>{
                    let value = $elem.data().value;
                    MatrixActions.changeFunction(value);
                    this.destroy();
                })
            this._$selectWrapper.append($item);
        });
    }
}
