import ResizeHelper from '../../public/components/matrix/ResizeHelper'

import '../../public/components/matrix/config'

describe('should show cross block', ()=> {
    var matrix;
    var resizeHelper;

    beforeEach(()=> {
        matrix = jasmine.createSpyObj('matrix', ['width', 'height', '$wrapper']);
        matrix.width = 4;
        matrix.height = 4;
        matrix.$wrapper = jasmine.createSpyObj('$wrapper', ['prepend']);

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

        expect(resizeHelper._$cross.width()).toEqual(3 * config.cell_size);
        expect(resizeHelper._$cross.height()).toEqual(3 * config.cell_size);
    });

    it('4x4 when add 1 col and 1 row', ()=> {
        resizeHelper.show(1, 1);
        resizeHelper.show(0, 0);
        resizeHelper.show(-1, -1);
        resizeHelper.show(0, 0);
        resizeHelper.show(1, 1);

        expect(resizeHelper._$cross.width()).toEqual(4 * config.cell_size);
        expect(resizeHelper._$cross.height()).toEqual(4 * config.cell_size);
        expect(resizeHelper._$add.width()).toEqual(5 * config.cell_size);
        expect(resizeHelper._$add.height()).toEqual(5 * config.cell_size)
    });

    it('3x4 when add 1 row and remove 1 col', ()=> {
        resizeHelper.show(-1, 1);

        expect(resizeHelper._$cross.width()).toEqual(3 * config.cell_size);
        expect(resizeHelper._$cross.height()).toEqual(4 * config.cell_size);
        expect(resizeHelper._$add.width()).toEqual(3 * config.cell_size);
        expect(resizeHelper._$add.height()).toEqual(5 * config.cell_size);
    });

    it('4x3 when add 1 col and remove 1 row', ()=> {
        resizeHelper.show(1, -1);

        expect(resizeHelper._$cross.width()).toEqual(4 * config.cell_size);
        expect(resizeHelper._$cross.height()).toEqual(3 * config.cell_size);
        expect(resizeHelper._$add.width()).toEqual(5 * config.cell_size);
        expect(resizeHelper._$add.height()).toEqual(3 * config.cell_size);
    });

    it('4x4 and addBlock 4x5',()=>{
        resizeHelper.show(-1, 1);
        resizeHelper.show(0, 1);

        expect(resizeHelper._$add.width()).toEqual(4 * config.cell_size);
    })
});