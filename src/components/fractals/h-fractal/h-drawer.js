export const HDrawer = (fractal) => {
    let lines = [];

    lines.push(...fractal.build());

    // console.log(lines.length)

    return lines;
}