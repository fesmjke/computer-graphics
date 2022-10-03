import { useEffect, useState } from "react";
import Canvas from "../../canvas/canvas";
import { FRACTAL_TYPES } from "../types";
import { Line } from "../util/line";
import { HTree} from "./h-tree";

const H = (props) => {
    const [type, setType] = useState(FRACTAL_TYPES.H);
    const [center, setCenter] = useState({x : 100, y : 250});
    const [iteration, setIteration] = useState(0);
    const [size, setSize] = useState(300);
    const [root, setRoot] = useState(new Line(center.x, center.y, center.x + size, center.y));
    const [tree, setTree] = useState(new HTree(root,iteration));

    useEffect(() => {
        const root = new Line(center.x, center.y, center.x + size, center.y);
        const tree = new HTree(root, iteration);

        console.log(tree.build().length)

        setTree(tree);
    },[iteration])

    const dec = () => {
        if(iteration === 0) {
            setIteration(iteration);
        }
        setIteration(iteration - 1);
    }

    const inc = () => {
        setIteration(iteration + 1);
    }

    return (<div>
        <div>
            <button onClick={inc}>+</button>
            <button onClick={dec}>-</button>
        </div>
        <Canvas fractal={tree} type={type} iteration={iteration}></Canvas>
    </div>)
}

export default H;