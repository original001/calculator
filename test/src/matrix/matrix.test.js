import Calculation from 'matrix/Calculation'
import 'lodash'

describe('should return correct result',()=>{
    it('when used all operators in arrays 2x2',()=>{
        var calc = new Calculation([
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
        ],['sum','multi','minus'])
        expect(calc.run()).toEqual([
            [45, 56],
            [59, 49]
        ]);
    });
});
describe('should return error',()=>{
    var array = [
            [
                [1,2],
                [1,2]
            ],
            [
                [1,2,4],
                [1,2,3]
            ]
        ]
    it('when summed arrays of different sizes',()=>{
        spyOn(Calculation, 'sum');
        var calc = new Calculation(array,['sum']);
        calc.run();
        expect(calc.run).toThrow()
        expect(Calculation.sum).toHaveBeenCalled();
    })
    it('when multiplied arrays of wrong sizes',()=>{
        spyOn(Calculation, 'multi');
        var calc = new Calculation(array,['multi']);
        calc.run();
        expect(calc.run).toThrow()
        expect(Calculation.multi).toHaveBeenCalled();
    })
})



