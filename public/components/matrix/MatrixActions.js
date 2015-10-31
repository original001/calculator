import 'es5-shim'

var MatrixActions = Reflux.createActions([
    'matrixError',
    'matrixValid',
    'calculate',
    {'changeFunction':arguments}
]);
export default MatrixActions