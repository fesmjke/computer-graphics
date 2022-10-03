export const KochDrawer = (fractal,limit,inversed) => {
    let lines = [];

    for(const line of fractal){
        lines.push(line);
    }   

    for(let i = 0; i < limit; i++){
        let notSplited = lines.filter((line) => line.isSplited() === false);

        for (const straightLine of notSplited){
            for (const line of straightLine.split(inversed)){
                lines.push(line);
            }
        }

        let temp = lines.filter((line) => line.isSplited() === false);
        
        lines = temp;
    }

    return lines;
}