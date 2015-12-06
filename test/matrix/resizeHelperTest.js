import ResizeHelper from 'components/matrix/ResizeHelper'

import '../../public/components/matrix/config'

describe('should show cross block', ()=> {
    var matrix;
    var resizeHelper;
    var cellSize = config.cell_size;

    beforeEach(()=> {
        matrix = jasmine.createSpyObj('matrix', ['width', 'height', 'view']);
        matrix.width = 4;
        matrix.height = 4;
        matrix.view = jasmine.createSpyObj('view', ['prepend']);

        resizeHelper = new ResizeHelper(matrix)
    });

    afterEach(()=> {
        matrix = null;
        resizeHelper = null;
    });

    it('3x3 when remove 1 col and 1 row some times', ()=> {
        resizeHelper.show(-1, -1);
        resizeHelper.show(-1, -1);
        resizeHelper.show(-1, -1);
        resizeHelper.show(-1, -1);

        //TODO: optimized tests -> createSpy crossBlock and check toHaveBeenCalledWith (width, height)

        expect(resizeHelper._$crossLayer.width()).toEqual(3 * cellSize);
        expect(resizeHelper._$crossLayer.height()).toEqual(3 * cellSize);
    });

    it('4x4 when add 1 col and 1 row', ()=> {
        resizeHelper.show(1, 1);
        resizeHelper.show(0, 0);
        resizeHelper.show(-1, -1);
        resizeHelper.show(0, 0);
        resizeHelper.show(1, 1);

        expect(resizeHelper._$crossLayer.width()).toEqual(4 * cellSize);
        expect(resizeHelper._$crossLayer.height()).toEqual(4 * cellSize);
        expect(resizeHelper._$addLayer.width()).toEqual(5 * cellSize);
        expect(resizeHelper._$addLayer.height()).toEqual(5 * cellSize)
    });

    it('3x4 when add 1 row and remove 1 col', ()=> {
        resizeHelper.show(-1, 1);

        expect(resizeHelper._$crossLayer.width()).toEqual(3 * cellSize);
        expect(resizeHelper._$crossLayer.height()).toEqual(4 * cellSize);
        expect(resizeHelper._$addLayer.width()).toEqual(3 * cellSize);
        expect(resizeHelper._$addLayer.height()).toEqual(5 * cellSize);
    });

    it('4x3 when add 1 col and remove 1 row', ()=> {
        resizeHelper.show(1, -1);

        expect(resizeHelper._$crossLayer.width()).toEqual(4 * cellSize);
        expect(resizeHelper._$crossLayer.height()).toEqual(3 * cellSize);
        expect(resizeHelper._$addLayer.width()).toEqual(5 * cellSize);
        expect(resizeHelper._$addLayer.height()).toEqual(3 * cellSize);
    });

    it('4x4 and addBlock 4x5',()=>{
        resizeHelper.show(-1, 1);
        resizeHelper.show(0, 1);

        expect(resizeHelper._$addLayer.width()).toEqual(4 * cellSize);
    })
});