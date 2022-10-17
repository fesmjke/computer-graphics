import { Line } from "../util/line";

export class HTree {
    constructor(line) {
        this.root = line;
        this.sqrt2 = Math.sqrt(2);
        this.lines = new Map();
        this.init = true;
    }

    scaled = (line) => {
        return line.length() / this.sqrt2;
    }

    * buildedLines(limit) {    
        for(const key of this.lines.keys()){
            if (key === limit){
                return this.lines.get(key);
            } else {
                yield this.lines.get(key)
            }
        }
    }

    builded = (limit) => {
        const generator = this.buildedLines(limit);
        const merge = [];
        let value;

        do {
            value = generator.next();
            merge.push(value.value);

        } while (!value.done)

        const flatMerged = merge.reduce((acc, curVal) => {
            return acc.concat(curVal)
        }, []);

        return flatMerged;
    }

    build = (limit) => {
        if(this.init){
            let vertical = this.genVertical(this.root);

            this.root.attach();
    
            this.lines.set(limit,[this.root,...vertical]);

            this.init = false;

            return this.builded(limit);
        }
        
        if(this.lines.has(limit)){
            return this.builded(limit);
        }

        if(this.lines.size >= 1){
            this.buildNewLines(limit);

            return this.builded(limit);
        }
    }

    buildNewLines = (limit) => {
        const filtered = this.lines.get(limit - 1).filter((l) => {return l.attached === false});

        const temp = [];

        for(const vline of filtered.filter((l) => l.vertical)){
            temp.push(...this.genHorizontal(vline))
            vline.attach();
        }

        for(const hline of temp.filter((l) => l.horizontal)){
            temp.push(...this.genVertical(hline))
            hline.attach();
        }

        this.lines.set(limit, temp);
    }

    genVertical = (line) => {
        const l = this.scaled(line);

        const v1 = new Line(line.start.x,line.start.y - l / 2, line.start.x, line.start.y + l / 2);
        const v2 = new Line(line.end.x, line.end.y - l / 2, line.end.x, line.end.y + l / 2);

        v1.vertical = true;
        v2.vertical = true;

        return [v1,v2];
    }

    genHorizontal = (line) => {
        const l = this.scaled(line);

        const h1 = new Line(line.start.x - l / 2, line.start.y, line.start.x + l / 2, line.start.y);
        const h2 = new Line(line.start.x - l / 2, line.end.y, line.start.x + l / 2, line.end.y);

        h1.horizontal = true;
        h2.horizontal = true;

        return [h1,h2];
    }
}