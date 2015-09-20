import InputMatrix from './InputMatrix'
import OutputMatrix from './OutputMatrix'
import MatrixControl from './MatrixControl'

let m1 = new InputMatrix(3, 2);
let m2 = new InputMatrix(3, 2);
// todo: 3 and more matrixes

let MainPage = new MatrixControl([m1,m2],"+");