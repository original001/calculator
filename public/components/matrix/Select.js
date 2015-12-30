import Dropdown from './Dropdown';

export default class Select extends Dropdown {
    _setValue(ind) {
    	super._setValue(ind);
    	
        var value = this._list[parseInt(ind)];

        this._$element.html(value[this._value]);

        this._initial = ind;

        this._fillPopup();
    }
}