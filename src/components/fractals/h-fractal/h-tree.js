import { Line } from "../util/line";

export class HTree {
    constructor(line,limit) {
        this.root = line;
        this.limit = limit;
        this.sqrt2 = Math.sqrt(2);
    }

    scaled = (line) => {
        return line.length() / this.sqrt2;
    }

    recursive = () => {
        
    }

    build = () => {
        let vertical = this.genVertical(this.root);

        this.root.attach();

        let horizontal = [];

        for(let i = 0; i < this.limit; i++) {
            for (const v of vertical) {
                horizontal.push(...this.genHorizontal(v));
                v.attach();
            }
            for (const h of horizontal) {
                vertical.push(...this.genVertical(h))
                h.attach();
            }   

            // console.log('v ',vertical.length , vertical);
            // console.log('h ',horizontal.length , horizontal);
        }

        return [this.root,...vertical,...horizontal];
    }

    genVertical = (line) => {
        const l = this.scaled(line);

        const v = new Line(line.start.x,line.start.y - l / 2, line.start.x, line.start.y + l / 2);
        const v1 = new Line(line.end.x, line.end.y - l / 2, line.end.x, line.end.y + l / 2);

        return [v,v1];
    }

    genHorizontal = (line) => {
        const l = this.scaled(line);

        const h1 = new Line(line.start.x - l / 2, line.start.y, line.start.x + l / 2, line.start.y);
        const h2 = new Line(line.start.x - l / 2, line.end.y, line.start.x + l / 2, line.end.y);
        // const h3 = new Line();
        // const h4 = new Line();

        return [h1,h2];
    }
}