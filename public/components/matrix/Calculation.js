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

    static determinant(A){
        var N = A.length, B = [], denom = 1, exchanges = 0;
        for (var i = 0; i < N; ++i) {
            B[i] = [];
            for (var j = 0; j < N; ++j) B[i][j] = A[i][j];
        }
        for (var i = 0; i < N - 1; ++i) {
            var maxN = i,
                maxValue = Math.abs(B[i][i]);
            for (var j = i + 1; j < N; ++j) {
                var value = Math.abs(B[j][i]);
                if (value > maxValue) {
                    maxN = j;
                    maxValue = value;
                }
            }
            if (maxN > i) {
                var temp = B[i];
                B[i] = B[maxN];
                B[maxN] = temp;
                ++exchanges;
            } else {
                if (maxValue == 0) return maxValue;
            }
            var value1 = B[i][i];
            for (var j = i + 1; j < N; ++j) {
                var value2 = B[j][i];
                B[j][i] = 0;
                for (var k = i + 1; k < N; ++k) B[j][k] = (B[j][k] * value1 - B[i][k] * value2) / denom;
            }
            denom = value1;
        }
        if (exchanges % 2) return -B[N - 1][N - 1];
        else return B[N - 1][N - 1];
        }
    }

export default Calculation