import 'es5-shim'

var MatrixActions = Reflux.createActions([
    'matrixError',
    'matrixValid',
    'calculate',
    {'error':arguments}
]);

export default MatrixActions