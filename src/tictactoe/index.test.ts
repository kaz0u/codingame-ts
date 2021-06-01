import { stripIndent } from 'common-tags'
import ticTacToe from "./index"
import { MockConsoleLog } from "../utils/index"

describe("Tic Tac Toe", () => {
    beforeEach(() => {
        MockConsoleLog.clearLogs();
    });

    afterAll(() => {
        MockConsoleLog.cleanUp();
    });

    test("No opponent - line", () => {
        const input = stripIndent`
            OO.
            ...
            ...`;
        const expectedOutput = stripIndent`
            OOO
            ...
            ...`;
        MockConsoleLog.test(ticTacToe, input, expectedOutput);
    });

    test("No opponent - column", () => {
        const input = stripIndent`
            O..
            ...
            O..`;
        const expectedOutput = stripIndent`
            O..
            O..
            O..`;
        MockConsoleLog.test(ticTacToe, input, expectedOutput);
    });

    test("No opponent - diagonal", () => {
        const input = stripIndent`
            O..
            .O.
            ...`;
        const expectedOutput = stripIndent`
            O..
            .O.
            ..O`;
        MockConsoleLog.test(ticTacToe, input, expectedOutput);
    });

    test("Real condition", () => {
        const input = stripIndent`
            OXX
            XO.
            O..`;
        const expectedOutput = stripIndent`
            OXX
            XO.
            O.O`;
        MockConsoleLog.test(ticTacToe, input, expectedOutput);
    });

    test("Real condition", () => {
        const input = stripIndent`
            ...
            ...
            ...`;
        const expectedOutput = stripIndent`
            false`;
        MockConsoleLog.test(ticTacToe, input, expectedOutput);
    });
})