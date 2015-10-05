import MatrixResizeControl from './MatrixResizeControl'

export default class MatrixResizeControlLeft extends MatrixResizeControl {
    _onMouseDown(){
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
    }
    _onMouseMove(){
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
    }
}