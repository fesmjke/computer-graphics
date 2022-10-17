export const drawLine = (ctx,points,connection,color,line) => {
    ctx.setLineDash(line);
    
    ctx.fillStyle = `rgb(${color.r},${color.g},${color.b})`;    
    

    if(connection){
        for(const point of points){
            ctx.lineTo(point.x,point.y);
        }
    } else {
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(points[1].x, points[1].y);
    }

    return
}