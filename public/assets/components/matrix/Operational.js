var Operational = {
    sum(matrixesAsArray){
        var newArray = [];
        var firstMatrix = _.first(matrixesAsArray);
        var secondMatrix = _.last(matrixesAsArray);
        if (secondMatrix.length === firstMatrix.length
            && secondMatrix[0].length === firstMatrix[0].length) {
            for (var i = 0; i < secondMatrix.length; i++) {
                newArray[i] = [];
                for (var j = 0; j < secondMatrix[i].length; j++) {
                    newArray[i][j] = +secondMatrix[i][j] + +firstMatrix[i][j]
                }
            }
        }
        if (!newArray.length) throw new Error('Массивы разной величины или один массив');
        return newArray
    },
    multiply(){}
};

export default Operational