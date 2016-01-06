const config = {
    resize_tollerance: 10,
    cell_size: 40,
    default_width: 4,
    default_height: 4,
    operators: {
        '+':'sum',
        '-':'minus',
        '*':'multi'
    },
    resizerTypes: {
        horizontal: 'hor',
        vertical: 'vert',
        diagonal: 'diag'
    },
    PRECISION: 3
};

global.config = config;