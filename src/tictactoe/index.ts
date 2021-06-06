
// Exercice from https://www.codingame.com/ide/puzzle/tictactoe

import type { Tuple } from "utils"

type LineIndices = Tuple<number, 3>;
class LineView {
    private indices: LineIndices;
    public constructor(private squares: string[], ...indices: LineIndices) {
        this.indices = indices;
    }
    public winningMove() {
        const nbO = this.indices.reduce((nbO, index) => {
            return (this.squares[index] === "O") ? nbO + 1 : nbO;
        }, 0);

        if (nbO !== 2)
            return undefined;

        return this.indices.find(index => this.squares[index] === ".");
    }
}

function printSquares(squaresStr: string) {
    for (let i = 0; i < 3; i++) {
        console.log(squaresStr.slice(3 * i, 3 * (i + 1)));
    }
}

export default function ticTacToe(readline: () => string) {
    let squaresStr: string = "";
    for (let i = 0; i < 3; i++) {
        const line: string = readline();
        squaresStr += line;
    }
    let squares = squaresStr.split(""); // One-line 3x3 board characters

    const lineViews = [
        new LineView(squares, 0, 1, 2), // first line left to right
        new LineView(squares, 3, 4, 5), // second line
        new LineView(squares, 6, 7, 8), // third line
        new LineView(squares, 0, 3, 6), // first column top to bottom
        new LineView(squares, 1, 4, 7), // second column
        new LineView(squares, 2, 5, 8), // third column
        new LineView(squares, 0, 4, 8), // top-left to bottom-right diagonal
        new LineView(squares, 6, 4, 2), // bottom-left to top-right diagonal
    ];

    let index: number | undefined;
    for (const view of lineViews) {
        index = view.winningMove()
        if (index) break;
    }

    if (index) {
        const result = squaresStr.substr(0, index) + "O" + squaresStr.substr(index + 1);
        printSquares(result);
    } else {
        console.log('false');
    }
}