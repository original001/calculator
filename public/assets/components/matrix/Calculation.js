import MatrixActions from './MatrixActions'

class Calculation {
    constructor(matrixesAsArray, operatorsAsArray){
        this._matrixes = matrixesAsArray || [];
        this._operators = operatorsAsArray || [];

        this._reduce();
    }
    _reduce(){
    this._matrixes.reduce((firstMatrix, secondMatrix, ind)=>{
        let func = this._operators[ind-1];
        let result = Calculation[func](firstMatrix, secondMatrix);
        MatrixActions.showResultMatrix(result);
        return result

    })
}
    static sum(firstMatrix, secondMatrix){
        var newArray = [];
        if (secondMatrix.length === firstMatrix.length
            && secondMatrix[0].length === firstMatrix[0].length) {
            for (var i = 0; i < secondMatrix.length; i++) {
                newArray[i] = [];
                for (var j = 0; j < secondMatrix[i].length; j++) {
                    newArray[i][j] = +secondMatrix[i][j] + +firstMatrix[i][j]
                }
            }
        } else {
            throw new Error('Массивы разной величины');
        }
        return newArray
    }

    static multiply(firstMatrix, secondMatrix){
        return firstMatrix;
    }
    static minus(firstMatrix, secondMatrix){
        return firstMatrix;
    }
    static devide(firstMatrix, secondMatrix){
        return firstMatrix;
    }

}

export default Calculation