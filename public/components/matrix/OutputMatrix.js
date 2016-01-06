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
                trans: 'транспонировать',
                multiNumber: 'умножить на число',
                pow: 'возвести в степень',
                inverse: 'найти обратную',
                rank: 'ранг матрицы',
                det: 'найти определитель',
            }
        });

        this.$menu.append(this._select.view)
    }
}

export default OutputMatrix