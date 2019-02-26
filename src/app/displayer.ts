import Grid from "./grid";

export default function displayer(grid: Grid, present = "O", notPresent = " "): void {
    const { maxX, minX, maxY, minY } = grid.getBounds();
    console.log("New step");
    for (let x = minX; x <= maxX; x++) {
        let str = "";
        for (let y = minY; y <= maxY; y++) {
            const isAlive = grid.get(x, y);
            str += isAlive ? present : notPresent;
        }
        console.log(str);
    }
    console.log("");
}
