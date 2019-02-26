const readline = require("readline");
import Grid from "./grid";
import displayer from "./displayer";
import computeNext from "./stepComputer";

function askQuestion(query: string) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise(resolve =>
        rl.question(query, (ans: string) => {
            rl.close();
            resolve(ans);
        })
    );
}

async function run() {
    const data: number[][] = [
        [0, 0, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 0],
        [0, 0, 0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 1, 0],
        [1, 0, 1, 0, 0, 0, 1],
        [1, 1, 0, 0, 1, 1, 1]
    ];
    let grid = Grid.createFromArray(data);

    for (let i = 0; true; i++) {
        displayer(grid);
        grid = computeNext(grid);
        const ans = await askQuestion("Appuyez sur entrer");
    }
}

run();
