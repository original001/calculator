import MatrixResizeControlLeft from '../../public/components/matrix/MatrixResizeControlLeft.js'
import MatrixResizeControlTop from '../../public/components/matrix/MatrixResizeControlTop.js'
import config from '../../public/components/matrix/config'

describe('should', ()=> {
    var resizer;
    var $el;
    var matrix;

    beforeEach(()=>{
        matrix = jasmine.createSpyObj('matrix',['addRows','addCols','removeRows','removeCols','width']);
        matrix.width = 4;
        resizer = new MatrixResizeControlLeft($('<div></div>'), matrix);
        resizer._onMouseDown();
    });

    afterEach(()=>{
        resizer = null;
        $el = null;
    });

    it('remove one column when the shift is equal to - half', ()=>{
        resizer._onMouseMove({clientX: - config.cell_size/2});
        resizer._onMouseUp();

        expect(matrix.removeCols).toHaveBeenCalledWith(1)
    });

    it('remove one column when the shift is equal to -1', ()=>{
        resizer._onMouseMove({clientX: - config.cell_size});
        resizer._onMouseUp();

        expect(matrix.removeCols).toHaveBeenCalledWith(1)
    });

    it('do nothing when the shift is equal to half of tollerance', ()=>{
        resizer._onMouseMove({clientX: + config.resize_tollerance/2});
        resizer._onMouseUp();

        expect(matrix.removeCols).not.toHaveBeenCalled();
        expect(matrix.addCols).not.toHaveBeenCalled()
    });

    it('add one column when the shift is equal to + half', ()=>{
        resizer._onMouseMove({clientX: + config.cell_size/2});
        resizer._onMouseUp();

        expect(matrix.addCols).toHaveBeenCalledWith(1)
    });

    it('add one column when the shift is equal to + 1', ()=>{
        resizer._onMouseMove({clientX: + config.cell_size});
        resizer._onMouseUp();

        expect(matrix.addCols).toHaveBeenCalledWith(1)
    });

    it('add three column when the shift is equal to 2 + half', ()=>{
        resizer._onMouseMove({clientX: + config.cell_size*5/2});
        resizer._onMouseUp();

        expect(matrix.addCols).toHaveBeenCalledWith(3)
    });

    it('remove three column when the shift is equal to - 2 + half', ()=>{
        resizer._onMouseMove({clientX: - config.cell_size*5/2});
        resizer._onMouseUp();

        expect(matrix.removeCols).toHaveBeenCalledWith(3)
    });

    it('remove three column when the shift is equal to - 5 + half', ()=>{
        resizer._onMouseMove({clientX: - config.cell_size*11/2});
        resizer._onMouseUp();

        expect(matrix.removeCols).toHaveBeenCalledWith(3)
    })

});

describe('should', ()=> {
    var resizer;
    var $el;
    var matrix;

    beforeEach(()=>{
        matrix = jasmine.createSpyObj('matrix',['addRows','addCols','removeRows','removeCols','height']);
        matrix.height = 4;
        resizer = new MatrixResizeControlTop($('<div></div>'), matrix);
        resizer._onMouseDown();
    });

    afterEach(()=>{
        resizer = null;
        $el = null;
    });

    it('remove one column when the shift is equal to - half', ()=>{
        resizer._onMouseMove({clientY: - config.cell_size/2});
        resizer._onMouseUp();

        expect(matrix.removeRows).toHaveBeenCalledWith(1)
    });

    it('remove one column when the shift is equal to -1', ()=>{
        resizer._onMouseMove({clientY: - config.cell_size});
        resizer._onMouseUp();

        expect(matrix.removeRows).toHaveBeenCalledWith(1)
    });

    it('do nothing when the shift is equal to half of tollerance', ()=>{
        resizer._onMouseMove({clientY: + config.resize_tollerance/2});
        resizer._onMouseUp();

        expect(matrix.removeRows).not.toHaveBeenCalled();
        expect(matrix.addRows).not.toHaveBeenCalled()
    });

    it('add one column when the shift is equal to + half', ()=>{
        resizer._onMouseMove({clientY: + config.cell_size/2});
        resizer._onMouseUp();

        expect(matrix.addRows).toHaveBeenCalledWith(1)
    });

    it('add one column when the shift is equal to + 1', ()=>{
        resizer._onMouseMove({clientY: + config.cell_size});
        resizer._onMouseUp();

        expect(matrix.addRows).toHaveBeenCalledWith(1)
    });

    it('add three column when the shift is equal to 2 + half', ()=>{
        resizer._onMouseMove({clientY: + config.cell_size*5/2});
        resizer._onMouseUp();

        expect(matrix.addRows).toHaveBeenCalledWith(3)
    });

    it('remove three column when the shift is equal to - 2 + half', ()=>{
        resizer._onMouseMove({clientY: - config.cell_size*5/2});
        resizer._onMouseUp();

        expect(matrix.removeRows).toHaveBeenCalledWith(3)
    });

    it('remove three column when the shift is equal to - 5 + half', ()=>{
        resizer._onMouseMove({clientY: - config.cell_size*11/2});
        resizer._onMouseUp();

        expect(matrix.removeRows).toHaveBeenCalledWith(3)
    })
});