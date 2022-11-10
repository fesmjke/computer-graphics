import {matrix, multiply, add} from "mathjs";

const toRads = (deg) => {
    return (deg * Math.PI) / 180.0;
}

const toDeg = (rad) => {
    return (rad * 180) / Math.PI;
}

const toMatrix = (points) => {
    const result = [];
    
    for (const key in points) {        
        if(key === 'center') {
            continue;
        }
        if (Object.hasOwnProperty.call(points, key)) {
            const temp = [];
            const element = points[key];
            
            temp.push(element.x, element.y);   

            result.push(temp);
        }
    }

    return matrix(result);
}

const toPoints = (mat,center) => {
    const points = {
        tl : {x: mat.get([0,0]), y: mat.get([0,1])},
        tr : {x: mat.get([1,0]), y: mat.get([1,1])},
        br : {x: mat.get([2,0]), y: mat.get([2,1])},
        bl : {x: mat.get([3,0]), y: mat.get([3,1])},
        center : center
    }

    return points;
}

const transform = (origin, ml) => {
    const center = origin.center;
    const matrix = toMatrix(origin);

    const n = multiply(matrix, ml);

    return toPoints(n,center);
}

const move = (origin, ml) => {
    const matrix = toMatrix(origin);
    const n = add(matrix, ml);

    return toPoints(n,origin.center);
}

export {
    toMatrix,
    toPoints,
    transform,
    toRads,
    toDeg,
    move
}