import Matrix from './Matrix'
import DropdownMenu from "./DropdownMenu"

class OutputMatrix extends Matrix {
    constructor(options){
        super(options);
        this.array = options.array || []
    }

    _init(){
        super._init();

        this._select = new DropdownMenu({
            list: {
                // trans: 'transpose',
                multiNumber: 'multiplied by...',
                pow: 'degree of...',
                inverse: 'get inverse',
                det: 'get determinant',
                rank: 'get rank',
            }
        });

        this.$menu.append(this._select.view)
    }
}

export default OutputMatrix