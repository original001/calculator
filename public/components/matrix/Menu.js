import DropdownMenu from './DropdownMenu';

import './styles/Menu.less';

export default class Menu {
	constructor() {
		this._$element = $(`<div class="table-menu"></div>`);

		this._init();
		this._attachEvents();
	}

	_init(){
		this._select = new DropdownMenu({
			list: {
				replace: 'транспонировать',
				equal: 'найти определитель',
				erase: 'очистить',
				trash: 'удалить'
			}
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