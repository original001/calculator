import MatrixResizeControl from '../../public/components/matrix/MatrixResizeControlLeft.js'

describe('should', ()=> {
    var resizer;
    var $el;
    var matrix;

    beforeEach(()=>{
        matrix = jasmine.createSpyObj('matrix',['addRows','addCols','removeRows','removeCols']);
        resizer = new MatrixResizeControl($('<div></div>'), matrix);
        // jasmine.clock().install();
    });

    afterEach(()=>{
        resizer = null;
        $el = null;
        // jasmine.clock().uninstall();
    });

    it('has css left equal position left coord', ()=>{
        resizer._onMouseDown();
        resizer._onMouseMove({clientX: -20});
        resizer._onMouseUp();

        expect(matrix.removeCols).toHaveBeenCalledWith(1)

        // expect($el.css).toHaveBeenCalledWith('left',$el.position().left);
    })
});
