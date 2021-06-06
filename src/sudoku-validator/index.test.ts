import { stripIndent } from 'common-tags'
import sudokuValidator from "./index"
import { MockConsoleLog } from "utils"

describe("Sudoku Validator", () => {
    beforeEach(() => {
        MockConsoleLog.clearLogs();
    });

    afterAll(() => {
        MockConsoleLog.cleanUp();
    });

    test("Basic grid", () => {
        const input = stripIndent`
            1 2 3 4 5 6 7 8 9
            4 5 6 7 8 9 1 2 3
            7 8 9 1 2 3 4 5 6
            9 1 2 3 4 5 6 7 8
            3 4 5 6 7 8 9 1 2
            6 7 8 9 1 2 3 4 5
            8 9 1 2 3 4 5 6 7
            2 3 4 5 6 7 8 9 1
            5 6 7 8 9 1 2 3 4`;
        const expectedOutput = stripIndent`
            true`;
        MockConsoleLog.test(sudokuValidator, input, expectedOutput);
    });

    test("Another correct grid", () => {
        const input = stripIndent`
            4 3 5 2 6 9 7 8 1
            6 8 2 5 7 1 4 9 3
            1 9 7 8 3 4 5 6 2
            8 2 6 1 9 5 3 4 7
            3 7 4 6 8 2 9 1 5
            9 5 1 7 4 3 6 2 8
            5 1 9 3 2 6 8 7 4
            2 4 8 9 5 7 1 3 6
            7 6 3 4 1 8 2 5 9`;
        const expectedOutput = stripIndent`
            true`;
        MockConsoleLog.test(sudokuValidator, input, expectedOutput);
    });

    test("Row error", () => {
        const input = stripIndent`
            4 3 2 2 6 9 7 8 1
            6 8 5 5 7 1 4 9 3
            1 9 7 8 3 4 5 6 2
            8 2 6 1 9 5 3 4 7
            3 7 4 6 8 2 9 1 5
            9 5 1 7 4 3 6 2 8
            5 1 9 3 2 6 8 7 4
            2 4 8 9 5 7 1 3 6
            7 6 3 4 1 8 2 5 9`;
        const expectedOutput = stripIndent`
            false`;
        MockConsoleLog.test(sudokuValidator, input, expectedOutput);
    });

    test("Column error", () => {
        const input = stripIndent`
            4 3 5 2 6 9 7 8 1
            6 8 2 5 7 1 4 9 3
            1 9 7 8 3 4 5 6 2
            8 2 6 1 9 5 3 4 7
            3 7 4 6 8 2 9 1 5
            1 5 9 7 4 3 6 2 8
            5 1 9 3 2 6 8 7 4
            2 4 8 9 5 7 1 3 6
            7 6 3 4 1 8 2 5 9`;
        const expectedOutput = stripIndent`
            false`;
        MockConsoleLog.test(sudokuValidator, input, expectedOutput);
    });

    test("Subgrid error", () => {
        const input = stripIndent`
            4 3 5 2 6 9 7 8 1
            6 8 2 5 7 1 4 9 3
            8 9 7 1 3 4 5 6 2
            1 2 6 8 9 5 3 4 7
            3 7 4 6 8 2 9 1 5
            9 5 1 7 4 3 6 2 8
            5 1 9 3 2 6 8 7 4
            2 4 8 9 5 7 1 3 6
            7 6 3 4 1 8 2 5 9`;
        const expectedOutput = stripIndent`
            false`;
        MockConsoleLog.test(sudokuValidator, input, expectedOutput);
    });

    test("Rubbish error", () => {
        const input = stripIndent`
            5 9 6 1 4 2 5 3 7
            6 1 4 3 5 8 2 4 8
            5 6 9 4 1 2 5 3 6
            1 9 5 3 6 8 4 1 6
            5 9 3 6 3 4 8 2 1
            5 9 5 3 2 1 4 5 6
            1 3 6 4 8 6 5 2 5
            4 1 2 3 6 8 4 9 2
            3 6 8 7 4 1 5 6 3`;
        const expectedOutput = stripIndent`
            false`;
        MockConsoleLog.test(sudokuValidator, input, expectedOutput);
    });

    test("When summing is not enough", () => {
        const input = stripIndent`
            1 3 3 4 5 6 7 7 9
            4 5 6 7 7 9 1 3 3
            7 7 9 1 3 3 4 5 6
            9 1 3 3 4 5 6 7 7
            3 4 5 6 7 7 9 1 3
            6 7 7 9 1 3 3 4 5
            7 9 1 3 3 4 5 6 7
            3 3 4 5 6 7 7 9 1
            5 6 7 7 9 1 3 3 4`;
        const expectedOutput = stripIndent`
            false`;
        MockConsoleLog.test(sudokuValidator, input, expectedOutput);
    });
})