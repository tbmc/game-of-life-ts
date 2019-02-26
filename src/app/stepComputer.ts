import Grid from "./grid";

function countNumberOfNeightbours(grid: Grid, x: number, y: number): number {
    let n = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            if (grid.get(x + i, y + j)) {
                n++;
            }
        }
    }
    return n;
}

export default function computeNext(grid: Grid): Grid {
    const nextGrid = new Grid();
    const { maxX, minX, maxY, minY } = grid.getBounds();

    for (let x = minX - 1; x <= maxX + 1; x++) {
        for (let y = minY - 1; y <= maxY + 1; y++) {
            const isAlive = grid.get(x, y);
            const neightbours = countNumberOfNeightbours(grid, x, y);
            
            if (isAlive) {
                nextGrid.set(x, y, !(neightbours < 2 || neightbours > 3));
            } else {
                nextGrid.set(x, y, neightbours === 3);
            }
        }
    }
    return nextGrid;
}
