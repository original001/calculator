const config = {
    resize_tollerance: 10,
    cell_size: 40,
    default_width: 4,
    default_height: 4,
    default_operator: '+',
    operators: {
        '+':'sum',
        '-':'minus',
        '*':'multi'
    },
    resizerTypes: {
        horizontal: 'hor',
        vertical: 'vert',
        diagonal: 'diag'
    }
};

global.config = config;