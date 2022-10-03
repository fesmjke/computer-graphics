import React,{useState} from "react";
import Canvas from "../../canvas/canvas";
import { FRACTAL_TYPES } from "../types";
import { Line } from "../util/line.js";

const Koch = (props) => {
    const [type, setType] = useState(FRACTAL_TYPES.INVERSED);
    const [iteration, setIteration] = useState(6);
    const [ratio, setRatio] = useState(0.5);
    const [size, setSize] = useState(700);
    const [center, setCenter] = useState({x : size - size, y : size - size / 10});
    const [style, setStyle] = useState(null);

    const h = size * (Math.sqrt(3)/2);

    const bot = new Line(center.x + size ,center.y,center.x ,center.y);
    const left = new Line(center.x, center.y, center.x + size / 2, center.y - h);
    const right = new Line(center.x + size / 2, center.y - h,center.x + size,center.y);

    const [root, setRoot] = useState([
        bot,
        left,
        right
    ]);

    return (
        <div>
            <div>
                <button>+</button>
                <button>-</button>
            </div>
            <Canvas fractal={root} type={type} iteration={iteration}></Canvas>
        </div>
    )
}

export default Koch;