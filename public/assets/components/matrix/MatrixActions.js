// import * as Reflux from 'reflux'

var MatrixActions = Reflux.createActions([
    'matrixError',
    'matrixValid',
    'calculate',
    {'changeFunction':arguments},
    {"showResultMatrix":arguments},
    {'calculationError':arguments}
]);
export default MatrixActions