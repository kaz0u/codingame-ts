import { stripIndent } from 'common-tags';
import vanEcksSequence from "./index";
import { MockConsoleLog } from "utils";

describe("Van Eck's sequence", () => {
    beforeEach(() => {
        MockConsoleLog.clearLogs();
    });

    afterAll(() => {
        MockConsoleLog.cleanUp();
    });

    test("Not seen", () => {
        const input = stripIndent`
            0
            2`;
        const expectedOutput = stripIndent`
            0`;
        MockConsoleLog.test(vanEcksSequence, input, expectedOutput);
    });

    test("Seen before", () => {
        const input = stripIndent`
            0
            3`;
        const expectedOutput = stripIndent`
            1`;
        MockConsoleLog.test(vanEcksSequence, input, expectedOutput);
    });

    test("A little long", () => {
        const input = stripIndent`
            1
            58`;
        const expectedOutput = stripIndent`
            11`;
        MockConsoleLog.test(vanEcksSequence, input, expectedOutput);
    });

    test("Longer", () => {
        const input = stripIndent`
            10
            5692`;
        const expectedOutput = stripIndent`
            7`;
        MockConsoleLog.test(vanEcksSequence, input, expectedOutput);
    });

    test("A little stress", () => {
        const input = stripIndent`
            1
            56804`;
        const expectedOutput = stripIndent`
            29`;
        MockConsoleLog.test(vanEcksSequence, input, expectedOutput);
    });

    test("Stress check", () => {
        const input = stripIndent`
            0
            1000000`;
        const expectedOutput = stripIndent`
            34143`;
        MockConsoleLog.test(vanEcksSequence, input, expectedOutput);
    });
});