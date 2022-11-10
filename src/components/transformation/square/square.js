const squareBuilder = (size, position) => {
    const points = {
        tl : {x: 0, y: 0}, // top left [0,0]
        tr : {x: 0, y: 0}, // top right [0,0]
        br : {x: 0, y: 0}, // bot right [0,0]
        bl : {x: 0, y: 0},  // bot left [0,0]
        center : position
    }

    points.tl = {
        x : position.x - size / 2,
        y : position.y - size / 2
    }

    points.tr = {
        x : position.x + size / 2,
        y : position.y - size / 2
    }

    points.br = {
        x : position.x + size / 2,
        y : position.y + size / 2
    }

    points.bl = {
        x : position.x - size / 2,
        y : position.y + size / 2
    }

    return points;
}



export {
    squareBuilder
};