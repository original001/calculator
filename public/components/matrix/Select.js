import Dropdown from './Dropdown';

export default class Select extends Dropdown {
	_setValue(key) {
		super._setValue(key);

		var obj = _.find(this._list, {key}) ;

		this._$element.html(obj.value);

		this._initial = key;

		this._fillPopup();
	}

	get prefix(){
		return '-select';
	}
}