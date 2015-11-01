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

    it('3x3 when remove 1 col and 1 row', ()=> {
        resizeHelper.show(-1, -1);

        expect(resizeHelper._$cross.width()).toEqual(3 * config.cell_size);
        expect(resizeHelper._$cross.height()).toEqual(3 * config.cell_size);
    })
});