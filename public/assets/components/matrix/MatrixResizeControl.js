import MatrixActions from './MatrixActions'

const RESIZE_TOLLERANCE = 10;
const CELL_SIZE = 40;

export default class MatrixResizeControl {
    constructor(options){
        this.$item = options.$item
        /**
         * @var this._availableDirections
         * @description available directions for resizing
         * @variants 'left', 'top', 'left-top'
         * @type String
         */
        this._availableDirections = options.pos || 'left'
        this.rows = 0
        this.cols = 0

        this._attachEvents()
    }
    _attachEvents(){
        this.$item.on('mousedown',evt=>{
            evt.preventDefault()

            const $target = $(evt.target);

            let dir = this._availableDirections;

            if (dir === 'left' || dir === 'top') {
                $target.css(dir, $target.position()[dir]);
                var absDir = $target.offset()[dir]
            } else {
                $target.css({
                    left: $target.position().left,
                    top: $target.position().top
                })
                var absLeft = $target.offset().left
                var absTop = $target.offset().top
            }

            $(document).on('mousemove.resize',evt=>{
                evt.preventDefault();

                if (dir === 'left') {
                    var shift = evt.clientX - absDir;
                    this.cols = Math.ceil(shift/CELL_SIZE)
                } else if (dir === 'top') {
                    var shift = evt.clientY - absDir;
                    this.rows = Math.ceil(shift/CELL_SIZE)
                } else if (dir === 'left-top') {
                    var shiftX = evt.clientX - absLeft;
                    var shiftY = evt.clientY - absTop;
                }

                if (shift > 0) {
                    console.log(`show green line for ${this.cols}`);
                    if (dir === 'left') {
                        console.log(' cols')
                    } else if (dir === 'top') {
                        console.log( 'rows')
                    }
                } else {
                    console.log(`show red line for ${-this.cols}`);
                    if (dir === 'left') {
                        console.log(' cols')
                    } else if (dir === 'top') {
                        console.log( 'rows')
                    }
                }

                // MatrixActions.resizeMatrix()

                // this._resize($target, left, shift);
            }); 
            $(document).one('mouseup',evt=>{
                // console.log(`add ${} cols, add ${} rows`)
                $(document).off('mousemove.resize');
            })
        });
    }
}