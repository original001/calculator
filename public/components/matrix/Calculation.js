import MatrixActions from './MatrixActions'

class Calculation {
    static run(matrixesAsArray, operatorsAsArray){
        return matrixesAsArray.reduce((firstMatrix, secondMatrix, ind)=>{
            let func = operatorsAsArray[ind-1];
            return Calculation[func](firstMatrix, secondMatrix);
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

    static multi(firstMatrix, secondMatrix){
        var newArray = [];
        var rowFirstMatrix = _.first(firstMatrix);
        var rowSecondMatrix = _.first(secondMatrix);
        if (rowFirstMatrix.length === secondMatrix.length) {
            for (var i = 0; i < firstMatrix.length; i++) {
                newArray[i] = [];
                for (var j = 0; j < rowSecondMatrix.length; j++) {
                    newArray[i][j] = 0
                    for (var k = 0; k < rowFirstMatrix.length; k++) {
                        newArray[i][j] += +firstMatrix[i][k] * +secondMatrix[k][j]
                    }
                }
            }
        } else {
            throw new Error('Форма матриц не согласована');
        }
        return newArray;
    }
    static minus(firstMatrix, secondMatrix){
        var newArray = [];
        if (secondMatrix.length === firstMatrix.length
            && secondMatrix[0].length === firstMatrix[0].length) {
            for (var i = 0; i < secondMatrix.length; i++) {
                newArray[i] = [];
                for (var j = 0; j < secondMatrix[i].length; j++) {
                    newArray[i][j] = +firstMatrix[i][j] - +secondMatrix[i][j]
                }
            }
        } else {
            throw new Error('Массивы разной величины');
        }
        return newArray
    }

}

export default Calculation