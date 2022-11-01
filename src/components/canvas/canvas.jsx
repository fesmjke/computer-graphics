import React, { useRef, useEffect, useState } from "react";
import { drawLine } from "./helpers/draw";
import "./styles.css";

const Canvas = ({fractal , type, styles, changeCenter}) => {
    const canvasRef = useRef(null);
    const [width, setWidth] = useState(800);
    const [height, setHeight] = useState(450);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.reset();

        for(const line of fractal){
            drawLine(ctx,line.points(),styles.connection,styles.color,styles.line);
        }

        if(styles.connection){
            ctx.fill();
        } else {
            ctx.strokeStyle = `rgb(${styles.color.r},${styles.color.g},${styles.color.b})`;
            ctx.stroke();
        }
        ctx.save();
    })

    const userClick = (event) => {
        const rect = canvasRef.current.getBoundingClientRect();

        
        const position = {
            x: Math.round(event.clientX - rect.left),
            y: Math.round(event.clientY - rect.top)
        }

        changeCenter(position);
    }

    return (
        <div className="canvas">
            <h3>{type}</h3>
            <canvas ref={canvasRef} width={width} height={height} onClick={userClick}></canvas>
        </div>
    )
}

export default Canvas;