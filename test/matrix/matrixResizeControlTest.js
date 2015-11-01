import MatrixResizeTrigger from '../../public/components/matrix/MatrixResizeTrigger.js'

import '../../public/components/matrix/config'

describe('should', ()=> {
    var resizer;
    var matrix;

    beforeEach(()=> {
        matrix = jasmine.createSpyObj('matrix', ['addRows', 'addCols', 'removeRows', 'removeCols', 'width']);
        matrix.width = 4;
        resizer = new MatrixResizeTrigger(matrix, config.resizerTypes.horizontal);
        resizer.onMouseDown();
    });

    it('remove one column when the shift is equal to - half', ()=> {
        resizer.onMouseMove({left: -config.cell_size / 2});
        resizer.onMouseUp();

        expect(matrix.removeCols).toHaveBeenCalledWith(1)
    });

    it('remove one column when the shift is equal to -1', ()=> {
        resizer.onMouseMove({left: -config.cell_size});
        resizer.onMouseUp();

        expect(matrix.removeCols).toHaveBeenCalledWith(1)
    });

    it('do nothing when the shift is equal to half of tollerance', ()=> {
        resizer.onMouseMove({left: +config.resize_tollerance / 2});
        resizer.onMouseUp();

        expect(matrix.removeCols).not.toHaveBeenCalled();
        expect(matrix.addCols).not.toHaveBeenCalled()
    });

    it('add one column when the shift is equal to + half', ()=> {
        resizer.onMouseMove({left: +config.cell_size / 2});
        resizer.onMouseUp();

        expect(matrix.addCols).toHaveBeenCalledWith(1)
    });

    it('add one column when the shift is equal to + 1', ()=> {
        resizer.onMouseMove({left: +config.cell_size});
        resizer.onMouseUp();

        expect(matrix.addCols).toHaveBeenCalledWith(1)
    });

    it('add three column when the shift is equal to 2 + half', ()=> {
        resizer.onMouseMove({left: +config.cell_size * 5 / 2});
        resizer.onMouseUp();

        expect(matrix.addCols).toHaveBeenCalledWith(3)
    });

    it('remove three column when the shift is equal to - 2 + half', ()=> {
        resizer.onMouseMove({left: -config.cell_size * 5 / 2});
        resizer.onMouseUp();

        expect(matrix.removeCols).toHaveBeenCalledWith(3)
    });

    it('remove three column when the shift is equal to - 5 + half', ()=> {
        resizer.onMouseMove({left: -config.cell_size * 11 / 2});
        resizer.onMouseUp();

        expect(matrix.removeCols).toHaveBeenCalledWith(3)
    })

});

describe('should', ()=> {
    var resizer;
    var matrix;

    beforeEach(()=> {
        matrix = jasmine.createSpyObj('matrix', ['addRows', 'addCols', 'removeRows', 'removeCols', 'height']);
        matrix.height = 4;
        resizer = new MatrixResizeTrigger(matrix, config.resizerTypes.vertical);
        resizer.onMouseDown();
    });

    it('remove one column when the shift is equal to - half', ()=> {
        resizer.onMouseMove({top: -config.cell_size / 2});
        resizer.onMouseUp();

        expect(matrix.removeRows).toHaveBeenCalledWith(1)
    });

    it('remove one column when the shift is equal to -1', ()=> {
        resizer.onMouseMove({top: -config.cell_size});
        resizer.onMouseUp();

        expect(matrix.removeRows).toHaveBeenCalledWith(1)
    });

    it('do nothing when the shift is equal to half of tollerance', ()=> {
        resizer.onMouseMove({top: +config.resize_tollerance / 2});
        resizer.onMouseUp();

        expect(matrix.removeRows).not.toHaveBeenCalled();
        expect(matrix.addRows).not.toHaveBeenCalled()
    });

    it('add one column when the shift is equal to + half', ()=> {
        resizer.onMouseMove({top: +config.cell_size / 2});
        resizer.onMouseUp();

        expect(matrix.addRows).toHaveBeenCalledWith(1)
    });

    it('add one column when the shift is equal to + 1', ()=> {
        resizer.onMouseMove({top: +config.cell_size});
        resizer.onMouseUp();

        expect(matrix.addRows).toHaveBeenCalledWith(1)
    });

    it('add three column when the shift is equal to 2 + half', ()=> {
        resizer.onMouseMove({top: +config.cell_size * 5 / 2});
        resizer.onMouseUp();

        expect(matrix.addRows).toHaveBeenCalledWith(3)
    });

    it('remove three column when the shift is equal to - 2 + half', ()=> {
        resizer.onMouseMove({top: -config.cell_size * 5 / 2});
        resizer.onMouseUp();

        expect(matrix.removeRows).toHaveBeenCalledWith(3)
    });

    it('remove three column when the shift is equal to - 5 + half', ()=> {
        resizer.onMouseMove({top: -config.cell_size * 11 / 2});
        resizer.onMouseUp();

        expect(matrix.removeRows).toHaveBeenCalledWith(3)
    })
});

describe('should', ()=> {
    var resizer;
    var matrix;
    const offset = 300;

    beforeEach(()=> {
        matrix = jasmine.createSpyObj('matrix', ['addRows', 'addCols', 'removeRows', 'removeCols', 'width', 'height']);
        matrix.height = 4;
        matrix.width = 4;
        resizer = new MatrixResizeTrigger(matrix, config.resizerTypes.diagonal);
        resizer.$item = jasmine.createSpyObj('item', ['css', 'position', 'offset']);
        resizer.$item.position = () => ({top: 160, left: 160});
        resizer.$item.offset = () => ({top: offset, left: offset});
        resizer.onMouseDown();
    });

    it('move left when cursor on edge of top', ()=> {
        resizer.onMouseMove({top: offset - config.cell_size * 4, left: offset});

        resizer.onMouseMove({top: offset - config.cell_size * 4, left: offset - config.cell_size * 2});
        resizer.onMouseUp();


        expect(matrix.removeRows).toHaveBeenCalledWith(3);
        expect(matrix.removeCols).toHaveBeenCalledWith(2);
    });

    describe('do nothing', ()=> {

        var nothingToExpect = () => {
            expect(matrix.removeCols).not.toHaveBeenCalled();
            expect(matrix.addCols).not.toHaveBeenCalled();
            expect(matrix.addRows).not.toHaveBeenCalled();
            expect(matrix.removeRows).not.toHaveBeenCalled();
        };

        it('when has not mousemove', ()=> {
            resizer.onMouseDown();

            nothingToExpect();
        });

        it('when has not shift', ()=>{
            resizer.onMouseMove({top: offset, left: offset});
            resizer.onMouseDown();

            nothingToExpect();
        });

        it('after adding', ()=> {
            resizer.onMouseMove({top: offset - config.cell_size, left: offset});
            resizer.onMouseUp();

            matrix.removeRows.calls.reset();

            resizer.onMouseDown();
            resizer.onMouseUp();

            nothingToExpect();
        })
    });

});