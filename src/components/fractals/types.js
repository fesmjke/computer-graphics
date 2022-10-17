export const FRACTAL_TYPES = {
    KOCH : 'Сніжинка Коха',
    INVERSED : 'Сніжинка Коха навпаки',
    H : 'Н-Фрактал'
}

export const LINES_TYPES = {
    STRAIGHT : {
        text : 'Пряма',
        pattern : []
    },
    DOTS : {
        text : 'Крапки',
        pattern : [1, 1]
    },
    SIMPLE_DASH : {
        text : 'Тире',
        pattern : [10, 10]
    },
    DASH_DOT : {
        text : 'Тире і Крапка',
        pattern : [15, 3, 3, 3]
    }
}