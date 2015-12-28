export default class Menu {
	constructor() {
		this._$element = $('<div class="table__menu"><i class="fa fa-ellipsis-h" /></div>');

		this._attachEvents();
	}

	_attachEvents() {
		this._$element.click(event => {
			console.log('click')	
		})
	}

	get view() {
		return this._$element
	}
}