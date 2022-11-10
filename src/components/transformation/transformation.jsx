import React,{useRef,useState,useEffect} from "react";
import {squareBuilder} from "./square/square";
import {transform,toRads, toDeg, move} from "./square/operations";
import {matrix} from "mathjs";
import "./styles.css";

const WIDHT = 700;
const HEIGHT = 500;

const TransformationPage = () => {
    const canvasRef = useRef(null);
    const canvasCtxRef = useRef(null);
    const [width, setWidth] = useState(WIDHT);
    const [height, setHeight] = useState(HEIGHT);
    const [center, setCenter] = useState({x : 0, y: 0});
    const [side, setSide] = useState(100);
    const [moving, setMoving] = useState(0);
    const [angle, setAngle] = useState(toRads(0));
    const [square, setSquare] = useState(squareBuilder(side, center));

    useEffect(() => {
        if (canvasRef.current) {
          canvasCtxRef.current = canvasRef.current.getContext("2d");
        }
    });

    const draw = (ctx,points) => {
        ctx.beginPath();
        ctx.font = "12px serif";
        ctx.moveTo(points.tl.x,points.tl.y);
        
        ctx.strokeText("T L",points.tl.x,points.tl.y);
        
        ctx.lineTo(points.tr.x,points.tr.y);

        ctx.strokeText("T R",points.tr.x,points.tr.y);

        ctx.lineTo(points.br.x,points.br.y);

        ctx.strokeText("B R",points.br.x,points.br.y);

        ctx.lineTo(points.bl.x,points.bl.y);

        ctx.strokeText("B L",points.bl.x,points.bl.y);

        ctx.lineTo(points.tl.x,points.tl.y);

        ctx.closePath();
        ctx.stroke();
    }

    useEffect(() => {
        // set up        
        const cntx = canvasCtxRef.current;

        cntx.reset();

        cntx.translate(width / 2,height / 2);

        // horizontal center line
        cntx.beginPath(); 
        cntx.moveTo(-width, 0);
        cntx.lineTo(width, 0);
        cntx.stroke();
        
        // // vertical center line
        cntx.beginPath(); 
        cntx.moveTo(0, height);
        cntx.lineTo(0, -height);
        cntx.stroke();

        cntx.fillStyle = "pink";

        console.log(square);

        // draw 
        // draw(cntx,square);
        

        const first = transform(square,matrix([[1,0],
                                              [0,1]]));
        
        const second = transform(first,matrix([[Math.cos(angle),-Math.sin(angle)],
        [Math.sin(angle),Math.cos(angle)]]));

        const result = move(second,matrix(  
            [[moving,0], // first num is horizontal moving (positive number moving right, negative - left)
             [moving,0], // second num is vertical moving (positive number moving down?, negative - up)
             [moving,0],
             [moving,0]]
        ));

        draw(cntx,result);

        // canvasCtxRef.current.fillRect(-side / 2 + width / 2, -side / 2 + height / 2, side, side);
    },[side,angle])

    const handleChangeAngle = (e) => {
        setAngle(toRads(e.target.value));
        setMoving(e.target.value);
    }

    return (
        <div className="transform-page">
            <h4>Transformation page</h4>
            <canvas ref={canvasRef} width={width} height={height}/>
            <input type="range" min={-360} max={360} value={toDeg(angle)} onChange={handleChangeAngle}></input>
            {<p>Angle : {toDeg(angle).toFixed(0)}</p>}
        </div>
    )
}

export default TransformationPage;