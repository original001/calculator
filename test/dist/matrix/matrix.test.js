define(['exports', 'matrix/Calculation', 'lodash'], function (exports, _matrixCalculation, _lodash) {
    'use strict';

    describe('should return correct result', function () {
        it('when used all operators in arrays 2x2', function () {
            var calc = new _matrixCalculation['default']([[[1, 2], [2, 4]], [[4, 6], [6, 2]], [[6, 2], [2, 6]], [[1, 2], [1, 3]]], ['sum', 'multi', 'minus']);
            expect(calc.run()).toEqual([[45, 56], [59, 49]]);
        });
    });
    describe('should return error', function () {
        var array = [[[1, 2], [1, 2]], [[1, 2, 4], [1, 2, 3]]];
        it('when summed arrays of different sizes', function () {
            spyOn(_matrixCalculation['default'], 'sum');
            var calc = new _matrixCalculation['default'](array, ['sum']);
            calc.run();
            expect(calc.run).toThrow();
            expect(_matrixCalculation['default'].sum).toHaveBeenCalled();
        });
        it('when multiplied arrays of wrong sizes', function () {
            spyOn(_matrixCalculation['default'], 'multi');
            var calc = new _matrixCalculation['default'](array, ['multi']);
            calc.run();
            expect(calc.run).toThrow();
            expect(_matrixCalculation['default'].multi).toHaveBeenCalled();
        });
    });
});
