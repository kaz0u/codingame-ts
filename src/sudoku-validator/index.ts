
// Exercice from https://www.codingame.com/ide/puzzle/tictactoe

import type { Tuple } from "../utils/Tuple"

type Index2D = Tuple<number, 2>;        // Sudoku square coordinates
type Unit = Tuple<number, 9>;           // Sudoku row, column or box of 9 squares
type Grid = Tuple<Unit, 9>;             // Sudoku grid of 9x9 squares
type UnitIndices = Tuple<Index2D, 9>;

class UnitView {
    private squares: Unit;
    public constructor(grid: Grid, indices: UnitIndices) {
        this.squares = indices.map(([i, j]) => grid[i][j]) as Unit;
    }
    public isValid() {
        // Check for duplicates
        if (new Set(this.squares).size !== this.squares.length)
            return false;

        // Compute min & max
        const [min, max] = this.squares.reduce(([min, max], square) => {
            return [Math.min(min, square), Math.max(max, square)];
        }, [9, 1]);

        return min === 1 && max === 9;
    }
}

function readGrid(readline: () => string): Grid {
    const grid: Array<number[]> = [];
    for (let i = 0; i < 9; i++) {
        var squares: string[] = readline().split(' ');
        if (squares.length !== 9)
            throw new Error(`Invalid line ${i} length`);

        grid[i] = Array(9);
        for (let j = 0; j < 9; j++) {
            const n: number = parseInt(squares[j]);
            if (Number.isNaN(n))
                throw new Error(`Found NaN at line ${i} column ${j}`);
            grid[i][j] = n;
        }
    }
    return grid as Grid;
}

export default function sudokuValidator(readline: () => string) {
    const grid = readGrid(readline);

    const gridUnits: UnitView[] = [];
    const sequence = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const;
    for (let i = 0; i < 9; i++) {
        const rowView = new UnitView(grid, sequence.map(j => [i, j]) as UnitIndices);
        const columnView = new UnitView(grid, sequence.map(j => [j, i]) as UnitIndices);
        const boxView = new UnitView(
            grid,
            sequence.map(
                j => [3 * Math.floor(i / 3) + Math.floor(j / 3), 3 * (i % 3) + j % 3]
            ) as UnitIndices
        );
        gridUnits.push(rowView, columnView, boxView);
    }


    if (grid) {
        console.log(gridUnits.every(unit => unit.isValid()));
    } else {
        console.log('false');
    }
}