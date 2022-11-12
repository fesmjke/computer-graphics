import { useEffect, useState } from "react";
import Fractal from "./fractal"
import FractalPanel from "./panel";
import FooterPanel from "../footer-panel/footer-panel";
import { FRACTAL_TYPES, LINES_TYPES } from "./types";
import {Link} from "react-router-dom";
import QuestionMark from "../../static/images/question.png";
import "./styles.css";

const LIMIT = 10;
const INITIAL_ITERATION = 0;
const LIMIT_SIZE = 400;
const INITIAL_SIZE = 100;
const SIZE_STEP = 50;
const INITIAL_CENTER = {x : 400, y : 225};
const DEFAULT_COLOR = { r: 128,g: 128,b: 128,a: 1 }
const DEFAULT_CONNECTION = false;

const FractalPage = () => {
    const [type,setType] = useState(FRACTAL_TYPES.KOCH);
    const [iteration, setIteration] = useState(INITIAL_ITERATION);
    const [size, setSize] = useState(INITIAL_SIZE);
    const [center,setCenter] = useState(INITIAL_CENTER);
    const [color, setColor] = useState(DEFAULT_COLOR);
    const [line, setLine] = useState(LINES_TYPES.STRAIGHT.pattern);
    const [connection, setConnection] = useState(DEFAULT_CONNECTION);

    useEffect(() => {
        setSize(INITIAL_SIZE);
        setCenter(INITIAL_CENTER);
        setIteration(INITIAL_ITERATION);
        setConnection(DEFAULT_CONNECTION);
    },[type])

    useEffect(() => {
        setIteration(INITIAL_ITERATION);
    },[center])

    useEffect(() => {
        setIteration(INITIAL_ITERATION);
    },[size])

    const changeType = (changedType) => {
        setType(changedType)
    }

    const incIter = () => {
        if(iteration === LIMIT - 2) {
            setIteration(iteration)
        } else {
            setIteration(iteration + 1);
        }
    }

    const decIter = () => {
        if(iteration === INITIAL_ITERATION) {
            setIteration(iteration)
        } else {
            setIteration(iteration - 1);
        }
    }

    const incSize = () => {
        if(size === LIMIT_SIZE && type === FRACTAL_TYPES.H) {
            setSize(size)
        } else {
            setSize(size + SIZE_STEP);
        }
    }

    const decSize = () => {
        if(size === INITIAL_SIZE) {
            setSize(size)
        } else {
            setSize(size - SIZE_STEP);
        }
    }

    const selectLine = (changedLine) => {
        const temp = changedLine.split(',').map((n) => {return +n})
        setLine(temp);
    }
    
    const changeCenter = (newCenter) => {
        setCenter(newCenter);
    }

    const changeColor = (color) => {
        setColor(color);
    }

    const changeConnection = (changedConnection) => {
        setConnection(changedConnection);
    }

    return (
        <div className="fractal-page">
            <Fractal type={type} 
                     iteration={iteration}
                     size={size}
                     line={line}
                     center={center}
                     color={color}
                     connection={connection}
                     changeCenter={changeCenter}
                     ></Fractal>
            
            <div className="details">
                <button className="btn btn-outline-light"><Link to={`../about/fractals`} style={{ textDecoration: 'none' }}><img src={QuestionMark}></img></Link></button>
            </div>

            <FooterPanel children={<FractalPanel
                color={color}
                changeColor={changeColor}
                iteration={iteration}
                size={size}
                changeType={changeType}
                incIter={incIter}
                decIter={decIter}
                incSize={incSize}
                decSize={decSize}
                center={center}
                selectLine={selectLine}
                connection={connection}
                connectionDisabled={type === FRACTAL_TYPES.H ? true : false}
                changeConnection={changeConnection}/>}/>
        </div>
    )
}

export default FractalPage;