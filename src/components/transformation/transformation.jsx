import React,{useRef,useState,useEffect, useCallback} from "react";
import {squareBuilder} from "./square/square";
import {transform,toRads, toDeg, move, getRandom} from "./square/operations";
import {matrix, setCartesian} from "mathjs";
import "./styles.css";

const WIDHT = 1000;
const HEIGHT = 500;

const TransformationPage = () => {
    const canvasRef = useRef(null);
    const canvasCtxRef = useRef(null);
    const [width, setWidth] = useState(WIDHT);
    const [height, setHeight] = useState(HEIGHT);
    const [center, setCenter] = useState({x : 0, y: 0});
    const [side, setSide] = useState(100);
    const [moving, setMoving] = useState(0);
    const [angle, setAngle] = useState(0);
    const [square, setSquare] = useState(squareBuilder(side, center));
    const [scalingMinXY, setScalingMinXY] = useState(1.0);
    const [scalingMaxXY, setScalingMaxXY] = useState(1.0);
    const [usingRandom, setUsingRandom] = useState(false);
    const [start, setStart] = useState(false);
    const [running, setRunning] = useState(false);
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        if (canvasRef.current) {
          canvasCtxRef.current = canvasRef.current.getContext("2d");
        }
    });

    useEffect(() => {
        setSquare(squareBuilder(side, center));
    },[side])

    useEffect(() => {
        setRunning(false);
    }, [timer]);

    useEffect(() => {      
        const cntx = canvasCtxRef.current;

        if(!start && !running){
            drawGrid(cntx);
            draw(cntx,square);
            return;
        }

        if(running) {
            return;
        }

        setRunning(true);

        let scalingSign = -1;
        let currentAngle = 0;
        let currentMove = 0;
        let scalingDeformationX = 1.0;
        let scalingDeformationY = 1.0;

        console.log(scalingMaxXY)

        // let shearingSign = 1;
        // const shearingMinXY = 0.0;
        // const shearingMaxXY = 1.0;
        // let shearingDeformationX = 0.0;
        // let shearingDeformationY = 0.0;

        const deformationStep = 0.1;
        const angleStep = 3;
        const moveStep = 3;

        const timer = setInterval(() => {
            const angleRotation = currentAngle + angleStep;
            
            if(angleRotation > angle) {
                setTimer(timer);
                setRunning(false);
                clearInterval(timer);
                return;
            }

            currentAngle = angleRotation;
            currentMove += moveStep; 
            
            if(scalingDeformationX.toFixed(1) === scalingMaxXY.toFixed(1) && scalingDeformationY.toFixed(1) === scalingMaxXY.toFixed(1)) {
                scalingSign = -1;
            } 
            
            if(scalingDeformationX.toFixed(1) === scalingMinXY.toFixed(1) && scalingDeformationY.toFixed(1) === scalingMinXY.toFixed(1)) {
                scalingSign = 1;
            }

            if(scalingMinXY !== scalingMaxXY && scalingMaxXY > scalingMinXY){
                scalingDeformationX += (deformationStep * scalingSign);
                scalingDeformationY += (deformationStep * scalingSign);
            }
            
            // if(shearingDeformationX.toFixed(1) === shearingMaxXY.toFixed(1) && shearingDeformationY.toFixed(1) === shearingMaxXY.toFixed(1)) {
            //     shearingSign = -1;
            // }

            // if(shearingDeformationX.toFixed(1) === shearingMinXY.toFixed(1) && shearingDeformationY.toFixed(1) === shearingMinXY.toFixed(1)) {
            //     shearingSign = 1;
            // }

            // shearingDeformationX += (deformationStep * shearingSign);
            // shearingDeformationY += (deformationStep * shearingSign);

            drawGrid(cntx);

            const deformationMartrix = !usingRandom ? matrix([[scalingDeformationX,0],[0,scalingDeformationY]]) : matrix([[Math.random() + 0.5,0],[0, Math.random()+ 0.5]]);

            const first = transform(square,deformationMartrix);

            const angleToRads = toRads(currentAngle);

            const second = transform(first,matrix([[Math.cos(angleToRads),-Math.sin(angleToRads)],
                                                   [Math.sin(angleToRads),Math.cos(angleToRads)]]));
            
            const result = move(second,matrix(  
                        [[currentMove,0], // first num is horizontal moving (positive number moving right, negative - left)
                         [currentMove,0], // second num is vertical moving (positive number moving down?, negative - up)
                         [currentMove,0],
                         [currentMove,0]]
            ));
    
            draw(cntx,result);
        },1000 / 30);
    },[angle,square,start])

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

    const drawGrid = (cntx) => {
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

        cntx.fillStyle = "black";
    }

    const handleChangeAngle = (e) => {
        setAngle(e.target.value);
        setMoving(e.target.value);
    }

    const handleChangeSide = (e) => {
        setSide(e.target.value);
    }

    const handleClickStart = () => {
        setStart(true);
    }

    const handleClickReset = () => {
        setStart(false);
    }

    const handleChangeScalingMinXY = (e) => {
        const value = e.target.value;
    
        setScalingMinXY(+value);
    }

    const handleChangeScalingMaxXY = (e) => {
        const value = e.target.value;

        console.log(value);

        setScalingMaxXY(+value);
    }

    return (
        <div className="transform-page">
            <h4>Transformation page</h4>
            <canvas ref={canvasRef} width={width} height={height}/>
            <input type="range" min={0} max={360} value={angle} onChange={handleChangeAngle} disabled={start}></input>
            <span>Direction</span><input type="checkbox"></input>
            <input type="number" value={side} onChange={handleChangeSide}></input>
            
            <div>
                <h5>Deformation settings</h5>
                <div>
                    <h5>Scaling along x and y</h5>
                    <span>Min <input type="number" min={0.1} max={3.0} step={0.1} value={scalingMinXY} onChange={handleChangeScalingMinXY}></input></span>
                    <span>Max <input type="number" min={0.1} max={3.0} step={0.1} value={scalingMaxXY} onChange={handleChangeScalingMaxXY}></input></span>
                </div>
            </div>

            {!start ? <button onClick={handleClickStart} disabled={start}>Start</button> : <button onClick={handleClickReset} disabled={running}>Reset</button>}
            {<p>Angle : {angle}</p>}
        </div>
    )
}

export default TransformationPage;