export const minimum = (...nums: number[]): number => {
    let min = 9007199254740991;
    for (const n of nums) {
        if (n < min) {
            min = n;
        }
    }
    return min;
};

export const maximum = (...nums: number[]): number => {
    let max = -9007199254740991;
    for (const n of nums) {
        if (n > max) {
            max = n;
        }
    }
    return max;
};

export default class Grid {
    public map = new Set<string>();
    private isUpToDate = true;
    private bounds = {
        maxX: 0,
        maxY: 0,
        minX: 0,
        minY: 0
    };

    public getBounds() {
        if (this.isUpToDate) {
            return this.bounds;
        }
        let maxX = 0,
            minX = 0,
            maxY = 0,
            minY = 0;
        for (const coords of this.map) {
            const tab = coords.split("::");
            const x = parseInt(tab[0]);
            const y = parseInt(tab[1]);

            if (x > maxX) {
                maxX = x;
            } else if (x < minX) {
                minX = x;
            }
            if (y > maxY) {
                maxY = y;
            } else if (y < minY) {
                minY = y;
            }
        }

        const obj = {
            maxX,
            minX,
            maxY,
            minY
        };
        this.bounds = obj;
        this.isUpToDate = true;
        return this.bounds;
    }

    public static createFromArray(array: boolean[][] | number[][]): Grid {
        const grid = new Grid();
        for (let i = 0; i < array.length; i++) {
            const tab = array[i];
            for (let j = 0; j < tab.length; j++) {
                const v = tab[j];
                if (typeof v === "boolean") {
                    grid.set(i, j, v);
                } else {
                    grid.set(i, j, v === 1 ? true : false);
                }
            }
        }
        return grid;
    }

    private getStr(x: number, y: number) {
        return `${x}::${y}`;
    }

    public set(x: number, y: number, value: boolean): void {
        this.isUpToDate = false;
        const str = this.getStr(x, y);
        if (value) {
            this.map.add(str);
        } else {
            this.map.delete(str);
        }
    }

    public get(x: number, y: number): boolean {
        const str = this.getStr(x, y);
        return this.map.has(str);
    }
}
