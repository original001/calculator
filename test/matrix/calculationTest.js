import Calculation from '../../public/components/matrix/Calculation.js'

describe('should return correct result',()=>{
    it('when used all operators in arrays 2x2',()=>{
        var result = Calculation.run([
            [
                [1,2],
                [2,4]    
            ],[
                [4,6],
                [6,2]
            ],[
                [6,2],
                [2,6]
            ],[
                [1,2],
                [1,3]
            ]
        ],['sum','multi','minus']);
        expect(result).toEqual([
            [45, 56],
            [59, 49]
        ]);
    });
});
describe('should return error',()=>{
    var firstMatrix = [[1,2],
                       [1,2]];

    describe('when summed and minused arrays of different',()=>{

        it('rows count',()=>{
            var secondMatrix = [[1,2],
                                [1,2],
                                [1,2]];

            expect(() => {
                Calculation.sum(firstMatrix, secondMatrix)
            }).toThrow();

            expect(() => {
                Calculation.minus(firstMatrix, secondMatrix)
            }).toThrow()
        });

        it('columns count',()=>{
            var secondMatrix = [[1,2,3],
                                [1,2,3]];

            expect(() => {
                Calculation.sum(firstMatrix, secondMatrix)
            }).toThrow();

            expect(() => {
                Calculation.minus(firstMatrix, secondMatrix)
            }).toThrow()
        });

    });

});

describe('should return', ()=>{
    it('error when multiplied arrays of 1x3 & 4x1 sizes',()=>{
        var firstMatrix = [[1,2,4]];

        var secondMatrix = [[1],
                            [3],
                            [3],
                            [1]];
        expect(() => {
            Calculation.multi(firstMatrix, secondMatrix)
        }).toThrow()
    });
    it('4x3 when multiplied arrays of 1x4 & 3x1', ()=>{
        var firstMatrix = [[1],
                           [3],
                           [3],
                           [1]];

        var secondMatrix = [[1,2,4]];

        var result = Calculation.multi(firstMatrix, secondMatrix);

        expect(result.length).toEqual(4);
        expect(result[0].length).toEqual(3);
    });

    it('1x1 = 11 when multiplied arrays of 3x1 & 1x3', ()=>{
        var firstMatrix = [[1,2,4]];

        var secondMatrix = [[1],
                            [3],
                            [1]];

        var result = Calculation.multi(firstMatrix, secondMatrix);

        expect(result.length).toEqual(1);
        expect(result[0].length).toEqual(1);
        expect(result[0][0]).toEqual(11);
    })
});

