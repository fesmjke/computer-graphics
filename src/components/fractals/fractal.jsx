import { useEffect, useMemo, useState } from "react";
import Canvas from "../canvas/canvas";
import { FRACTAL_TYPES } from "./types";
import { Line } from "./util/line";
import { HTree } from "./h-fractal/h-tree";
import { Koch } from "./koch/koch-fractal";

const Fractal = (props) => {
    const [root, setRoot] = useState(null);
    const [core, setCore] = useState(null);

    useEffect(() => {

        switch(props.type){
            case(FRACTAL_TYPES.KOCH): {
                
                const h = props.size * (Math.sqrt(3)/2);

                const bot = new Line(props.center.x + props.size / 2,props.center.y,props.center.x - props.size / 2,props.center.y);
                const left = new Line(props.center.x - props.size / 2, props.center.y, props.center.x, props.center.y - h);
                const right = new Line(props.center.x, props.center.y - h, props.center.x + props.size / 2,props.center.y)

                const nroot = [bot,left,right]

                setRoot(nroot);
                
                const ncore = new Koch(nroot);

                setCore(ncore);

                break;
            }
            case(FRACTAL_TYPES.INVERSED): {

                const h = props.size * (Math.sqrt(3)/2);

                const bot = new Line(props.center.x + props.size / 2,props.center.y,props.center.x - props.size / 2,props.center.y);
                const left = new Line(props.center.x - props.size / 2, props.center.y, props.center.x, props.center.y - h);
                const right = new Line(props.center.x, props.center.y - h, props.center.x + props.size / 2,props.center.y)

                const nroot = [bot,left,right]

                setRoot(nroot);
                
                const ncore = new Koch(nroot);

                setCore(ncore);

                break;
            }
            case(FRACTAL_TYPES.H): {
                const nroot = new Line(props.center.x - props.size / 2, props.center.y, props.center.x + props.size / 2, props.center.y);
                const ncore = new HTree(nroot);

                setRoot(nroot);
                setCore(ncore);

                break;
            }
        }
    },[props.type,props.center,props.size])

    const lines = useMemo(() => {

        if(core === null){
            return [];
        }

        if(props.type === FRACTAL_TYPES.INVERSED) {
            return core.build(props.iteration,true);
        }

        return core.build(props.iteration);
    },[props.iteration,core]);

    const connection = props.connection;
    const color = props.color;
    const line = props.line;

    const styles = {connection, color, line};

    return <Canvas fractal={lines} type={props.type} styles={styles} changeCenter={props.changeCenter}></Canvas>
}

export default Fractal;