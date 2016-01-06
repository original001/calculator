class Calculation {
	static run(matrixesAsArray, operatorsAsArray){
		return matrixesAsArray.reduce((firstMatrix, secondMatrix, ind)=>{
			let func = operatorsAsArray[ind-1];
			return Calculation[func](firstMatrix, secondMatrix);
		})
	}
	static sum(A, B){
		var newArray = [];

		if (B.length !== A.length || B[0].length !== A[0].length) {
			throw new Error('Массивы разной величины');
		} 

		for (var i = 0; i < B.length; i++) {
			newArray[i] = [];
			for (var j = 0; j < B[i].length; j++) {
				newArray[i][j] = +B[i][j] + +A[i][j]
			}
		}

		return newArray
	}

	static multi(A, B){
		var newArray = [];
		var rowFirstMatrix = A[0];
		var rowSecondMatrix = B[0];
		if (rowFirstMatrix.length !== B.length) {
			throw new Error('Форма матриц не согласована');
		} 		

		for (var i = 0; i < A.length; i++) {
			newArray[i] = [];
			for (var j = 0; j < rowSecondMatrix.length; j++) {
				newArray[i][j] = 0
				for (var k = 0; k < rowFirstMatrix.length; k++) {
					newArray[i][j] += +A[i][k] * +B[k][j]
				}
			}
		}

		return newArray;
	}

	static minus(A, B){
		var newArray = [];
		if (B.length !== A.length || B[0].length !== A[0].length) {
			throw new Error('Массивы разной величины');
		} 

		for (var i = 0; i < B.length; i++) {
			newArray[i] = [];
			for (var j = 0; j < B[i].length; j++) {
				newArray[i][j] = +A[i][j] - +B[i][j]
			}
		}

		return newArray
	}
	static determinant(A) {
		/**
		 * Вычисление определителя матрицы (алгоритм Барейса)
		 * А - двумерный массив
		 */

		var N = A.length,
			B = [],
			denom = 1,
			exchanges = 0;
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

	static rank(A) {
		/**
		 * Ранг матрицы
		 * A - двумерный массив
		 */

		var m = A.length,
			n = A[0].length,
			k = (m < n ? m : n),
			r = 1,
		rank = 0;
		while (r <= k) {
			var B = [];
			for (var i = 0; i < r; i++) B[i] = [];
			for (var a = 0; a < m - r + 1; a++) {
				for (var b = 0; b < n - r + 1; b++) {
					for (var c = 0; c < r; c++) {
						for (var d = 0; d < r; d++) B[c][d] = A[a + c][b + d];
					}
					if (Calculation.determinant(B) != 0) rank = r;
				}
			}
			r++;
		}
		return rank;
	}

	static adjugate(A) {
		/**
		 * Союзной к матрице A называют матрицу adjA, которая получается из матрицы A, 
		 если все ее элементы заменить соответствующими алгебраическими дополнениями Ai,j
		 и к полученной матрице применить операцию транспонирования.
		 */

		var N = A.length,
			adjA = [];
		for (var i = 0; i < N; i++) {
			adjA[i] = [];
			for (var j = 0; j < N; j++) {
				var B = [],
					sign = ((i + j) % 2 == 0) ? 1 : -1;
				for (var m = 0; m < j; m++) {
					B[m] = [];
					for (var n = 0; n < i; n++) B[m][n] = A[m][n];
					for (var n = i + 1; n < N; n++) B[m][n - 1] = A[m][n];
				}
				for (var m = j + 1; m < N; m++) {
					B[m - 1] = [];
					for (var n = 0; n < i; n++) B[m - 1][n] = A[m][n];
					for (var n = i + 1; n < N; n++) B[m - 1][n - 1] = A[m][n];
				}
				adjA[i][j] = sign * Calculation.determinant(B);
			}
		}
		return adjA;
	}

	static inverse(A) {
		/**
		 * Обратная матрица
		 */
		var m = A.length,
			n = A[0].length;

		if (n !== m || Calculation.determinant(A) === 0) 
			throw new Error('Для неквадратных и вырожденных (определитель равен нулю) матриц обратных матриц не существует');

		var det = Calculation.determinant(A);
		if (det == 0) return false;
		var N = A.length,
			A = Calculation.adjugate(A);
		for (var i = 0; i < N; i++) {
			for (var j = 0; j < N; j++) A[i][j] /= det;
		}
		return A;
	}

	static trans(A) {
		/**
		 * Транспонированная матрица
		 */

		var m = A.length,
			n = A[0].length,
			AT = [];
		for (var i = 0; i < n; i++) {
			AT[i] = [];
			for (var j = 0; j < m; j++) AT[i][j] = A[j][i];
		}
		return AT;
	}
}

export default Calculation