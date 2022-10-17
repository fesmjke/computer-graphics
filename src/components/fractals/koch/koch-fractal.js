export class Koch{
    constructor(lines){
        this.root = lines;
        this.lines = new Map();
        this.init = true;
    }

    * splitedLines(limit) {
        for(const key of this.lines.keys()){
            if(key === limit) {
                return this.lines.get(key);
            } else {
                yield this.lines.get(key);
            }
        }
    }

    builded = (limit) => {
        const generator = this.splitedLines(limit);
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

    splitNewLines = (limit,inversed) => {
        let temp = [];

        let notSplited = this.lines.get(limit - 1).filter(((line) => line.isSplited() === false));
    
        for (const straightLine of notSplited){
            for (const line of straightLine.split(inversed)){
                temp.push(line);
            }
        }

        this.lines.set(limit,temp);
    }

    build(limit,inversed){
        if(this.init) {
            this.lines.set(limit,this.root);
            this.init = false;
            return this.lines.get(limit);
        }

        if(this.lines.has(limit)){
            return this.lines.get(limit);
        }

        if(this.lines.size >= 1) {
            this.splitNewLines(limit,inversed);

            return this.lines.get(limit);
        }
    }
}