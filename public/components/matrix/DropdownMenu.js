import Dropdown from './Dropdown';

class DropdownMenu extends Dropdown {
    _setInitialState() {
        this._$element.html('<i class="fa fa-ellipsis-h table-menu-icon"/>');
    }

    get prefix(){
    	return '-menu';
    }

    _fillPopup(){
    	super._fillPopup();

    	this._$popup.prepend(`
            <div class="dropdown${this.prefix}__icon">
                <i class="fa fa-ellipsis-h table-menu-icon"/>
            </div>`)
    }
}

export default DropdownMenu