export class Line {
    constructor(x1,y1,x2,y2){
        this.start = {x : x1, y : y1};
        this.end = {x : x2, y : y2};
        this.splited = false;
        this.attached = false;
    }

    points = () => {
        return [this.start, this.end];
    }

    length = () => {
        return Math.sqrt(Math.pow(this.end.x - this.start.x,2) + Math.pow(this.end.y - this.start.y,2));
    }

    lengthBetwen = (first,second) => {
        return Math.sqrt(Math.pow(second.x - first.x,2) + Math.pow(second.y - first.y,2));
    }

    center = () => {
        return [{x: (this.start.x + this.end.x) / 2, y:(this.start.y + this.end.y) / 2}];
    }

    deltas = () => {
        return [{dx : this.end.x - this.start.x, dy : this.end.y - this.start.y}];
    }

    angle = () => {
        const [deltas] = this.deltas();
        return Math.atan2(deltas.dy,deltas.dx);
    }

    attach = () => {
        this.attached = true;
    }

    isAttached = () => {
        return this.attached;
    }

    isSplited = () => {
        return this.splited;
    }

    split = (inversed) => {
        const coeficient = 1/3;
        const unit = this.length() * coeficient;
        const [deltas] = this.deltas();
        const angle = this.angle();
        
        const botleft = {
            x: this.start.x + deltas.dx * coeficient,
            y: this.start.y + deltas.dy * coeficient
        }

        const botright = {
            x: this.end.x - deltas.dx * coeficient,
            y: this.end.y - deltas.dy * coeficient
        }

        let top = {
            x: botleft.x + Math.cos(angle - Math.PI * coeficient) * unit,
            y: botleft.y + Math.sin(angle - Math.PI * coeficient) * unit
        }

        const itop = {
            x: botright.x - Math.cos(angle - Math.PI * coeficient) * unit ,
            y: botright.y - Math.sin(angle - Math.PI * coeficient) * unit 
        }

        top = inversed ? itop : top;

        this.splited = true;

        return [new Line(this.start.x,this.start.y,botleft.x,botleft.y),
                new Line(botleft.x,botleft.y, top.x, top.y), 
                new Line(top.x, top.y, botright.x,botright.y), 
                new Line(botright.x, botright.y,this.end.x, this.end.y)]
    }
}