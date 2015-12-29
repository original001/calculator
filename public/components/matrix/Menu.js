import Select from './Select';

import './Menu.less';

export default class Menu {
	constructor() {
		this._$element = $(`<div class="table-menu"></div>`);

		this._init();
		this._attachEvents();
	}

	_init(){
		var list = {
			more: 'fa-ellipsis-h',
			replace: 'fa-retweet',
			equal: 'fa-share-square-o',
			erase: 'fa-eraser',
			trash: 'fa-trash-o'
		};

        this._list = [];

        for (let className in list) {
            if (list.hasOwnProperty(className))
                this._list.push({[className]: `<i class="fa ${list[className]}"/>`});
        }

		this._select = new Select({list: this._list, orientation: 'horizontal', size: 28});

		this._$element
			.append(this._select.view);
	}

	_attachEvents() {
		this._select.view.on('change.select', () => {
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