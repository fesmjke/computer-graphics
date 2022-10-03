export const drawLine = (ctx,points,connection,color="gray") => {
    ctx.fillStyle = color;    

    if(connection){
        for(const point of points){
            ctx.lineTo(point.x,point.y);
        }
    } else {
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(points[1].x, points[1].y);
    }
}