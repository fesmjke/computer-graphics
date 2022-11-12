import React,{useRef,useState,useEffect, useCallback} from "react";
import {squareBuilder} from "./square/square";
import {transform,toRads, toDeg, move, getRandom} from "./square/operations";
import {matrix, setCartesian} from "mathjs";
import "./styles.css";
import FooterPanel from "../footer-panel/footer-panel";

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
            
            if(scalingDeformationX.toFixed(1) >= scalingMaxXY.toFixed(1) && scalingDeformationY.toFixed(1) >= scalingMaxXY.toFixed(1)) {
                scalingSign = -1;
            } 
            
            if(scalingDeformationX.toFixed(1) <= scalingMinXY.toFixed(1) && scalingDeformationY.toFixed(1) <= scalingMinXY.toFixed(1)) {
                scalingSign = 1;
            }

            if(scalingMinXY === scalingMaxXY) {
                scalingDeformationX = scalingDeformationX;
                scalingDeformationY = scalingDeformationY;
            } else {
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

            const deformationMartrix = !usingRandom ? matrix([[scalingDeformationX,0],[0,scalingDeformationY]]) : matrix([[getRandom(scalingMinXY,scalingMaxXY),0],[0, getRandom(scalingMinXY,scalingMaxXY)]]);

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
        // ctx.font = "12px serif";
        ctx.moveTo(points.tl.x,points.tl.y);
           
        ctx.lineTo(points.tr.x,points.tr.y);

        ctx.lineTo(points.br.x,points.br.y);

        ctx.lineTo(points.bl.x,points.bl.y);

        ctx.lineTo(points.tl.x,points.tl.y);

        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "black";
        ctx.beginPath()

        ctx.moveTo(points.tl.x ,points.tl.y );
           
        ctx.lineTo(points.tr.x ,points.tr.y );

        ctx.lineTo(points.br.x ,points.br.y );

        ctx.lineTo(points.bl.x ,points.bl.y );

        ctx.lineTo(points.tl.x ,points.tl.y );

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

        cntx.fillStyle = "white";
    }

    const handleChangeAngle = (e) => {
        setAngle(e.target.value);
        setMoving(e.target.value);
    }

    const handleChangeSide = (e) => {
        if(+e.target.value < 50) {
            setSide(side);
        } else if (+e.target.value > 250) {
            setSide(side);
        } else {
            setSide(e.target.value);
        }
    }

    const handleClickStart = () => {
        setStart(true);
    }

    const handleClickReset = () => {
        setStart(false);
    }

    const handleChangeScalingMinXY = (e) => {
        const value = e.target.value;
        
        if(value <= scalingMaxXY) {
            setScalingMinXY(+value);
        }
    }

    const handleChangeScalingMaxXY = (e) => {
        const value = e.target.value;

        if(value >= scalingMinXY) {
            setScalingMaxXY(+value);
        }
    }

    const setRandom = () => {
        setUsingRandom(!usingRandom);
    }

    return (
        <div className="transform-page">
            <h4>Transformation page</h4>
            <canvas ref={canvasRef} width={width} height={height}/>
            <FooterPanel>
                <React.Fragment>

                <div className="place-holder">

                </div>
                
                <div className="side-settings form-group">
                    <h5>Розмір сторони квадрата</h5>
                    <input type="number" value={side} onChange={handleChangeSide}></input>
                </div>

                <div className="angle-settings form-group">
                    <input type="range" min={0} max={360} value={angle} onChange={handleChangeAngle} disabled={start}></input>
                    {<p>Кут повороту : {angle}</p>}

                    {!start ? <button className="btn btn-outline-light cbtn-t" onClick={handleClickStart} disabled={start}>Почати</button> : <button className="btn btn-outline-light cbtn-t" onClick={handleClickReset} disabled={running}>Скинути</button>}    

                </div>

                <div className="deformation-settings">
                    <h5>Деформація (масштабування)</h5>
                    <span>Мінімальний <input type="number" min={0.1} max={3.0} step={0.1} value={scalingMinXY} onChange={handleChangeScalingMinXY}></input></span>
                    <span>Максимальний <input type="number" min={0.1} max={3.0} step={0.1} value={scalingMaxXY} onChange={handleChangeScalingMaxXY}></input></span>
                    <span>Використовувати випадковість <input type="checkbox" value={usingRandom} onChange={setRandom}></input></span>
                </div>

                </React.Fragment>
            </FooterPanel>
        </div>
    )
}

export default TransformationPage;