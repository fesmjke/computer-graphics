import React, { useRef, useEffect, useState, useMemo } from "react";
import { HDrawer } from "../fractals/h-fractal/h-drawer";
import { KochDrawer } from "../fractals/koch/koch-drawer";
import { FRACTAL_TYPES } from "../fractals/types";
import { drawLine } from "./helpers/draw";
import "./styles.css";

const Canvas = (props) => {
    const fractal = props.fractal;
    const canvasRef = useRef(null);
    const [type, setType] = useState(props.type);
    const [iteration, setIteration] = useState(props.iteration);
    const [width, setWidth] = useState(700);
    const [height, setHeight] = useState(700);

    let lines = useMemo(() => {
        if(type === FRACTAL_TYPES.KOCH) {
            return KochDrawer(fractal,iteration,false);
        } else if (type === FRACTAL_TYPES.INVERSED) {
            return KochDrawer(fractal,iteration,true);
        } else {
            return HDrawer(fractal,iteration)
        }
    },[type,fractal,iteration]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const connection = type === FRACTAL_TYPES.H ? false : true;

        ctx.reset();

        for(const line of lines){
            drawLine(ctx,line.points(),connection);
        }

        type === FRACTAL_TYPES.H ? ctx.stroke() : ctx.fill();
      })

    return <canvas ref={canvasRef} {...props} width={width} height={height}></canvas>
}

export default Canvas;