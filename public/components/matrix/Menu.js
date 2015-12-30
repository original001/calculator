import Dropdown from './Dropdown';

import './styles/Menu.less';

export default class Menu {
	constructor() {
		this._$element = $(`<div class="table-menu"></div>`);

		this._init();
		this._attachEvents();
	}

	_init(){
		this._select = new Dropdown({
			list: {
				more: '<i class="fa fa-ellipsis-h"/>',
				replace: 'транспонировать',
				equal: 'найти определитель',
				erase: 'очистить',
				trash: 'удалить'
			}, 
			initial:'more'
		});

		this._$element
			.append(this._select.view);
	}

	_attachEvents() {
		this._select.view.on('change.dropdown', () => {
			this._value = this._select.value;
			this._$element.trigger('change.menu');
		});
	}

	get value() {
		return this._value;
	}

	get view() {
		return this._$element
	}
}