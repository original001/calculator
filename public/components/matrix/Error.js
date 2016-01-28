import './styles/Error.less'

const CLOSING_DELAY = 5000;

class Error {
	constructor(){
		this._$element = $('<div class="error-notify" />');
		this._$wrapper = $('<div class="error-notify__wrapper" />');
		this._$warningIcon = $('<div class="error-notify__icon_warning"><i class="fa fa-exclamation-circle" /></div>');
		this._$closeIcon = $('<div class="error-notify__icon_close"><i class="fa fa-times" /></div>');
		this._$text = $('<div class="error-notify__text" />')
		this._isShown = false;

		this._init();
		this._attachEvents();
	}
	_attachEvents(){
		this._$closeIcon.click(evt => {
			this._close();
		});
	}
	_init(){
		this._$element
			.append(this._$warningIcon)
			.append(this._$text)
			.append(this._$closeIcon);

		this._$wrapper
			.append(this._$element)
			.appendTo($('body'))
	}

	throw(message){
		this._$text.html(message);
		if (this._isShown) {
			this._highlight();
			return;
		}
		this._close();
		this._open();
	}

	_open(){
		this._$wrapper.addClass('show');
		this._isShown = true;
		this._timer = setTimeout(this._close.bind(this), CLOSING_DELAY);
	}

	_close(){
		this._$wrapper.removeClass('show');
		this._isShown = false;
		clearTimeout(this._timer);
	}

	_highlight(){
		this._$element.one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
			$(this).removeClass('highlight');
		});

		this._$element
			.addClass('highlight');

		clearTimeout(this._timer);
		this._timer = setTimeout(this._close.bind(this), CLOSING_DELAY);
	}
}

export default Error