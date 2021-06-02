type ReadLineFunction = () => string;
type TestFunction = (readline: ReadLineFunction) => void;

function generateReadLine(lines: string) {
    const generator = lines.split("\n").values();
    return () => generator.next().value;
}


const consoleLogs: string[] = [];
const consoleLog = jest.spyOn(console, 'log')
    .mockImplementation((...args: string[]) => consoleLogs.push(...args));

export const MockConsoleLog = {
    test(method: TestFunction, input: string, expectedOutput: string) {
        method(generateReadLine(input));
        expect(consoleLogs.join("\n")).toBe(expectedOutput);
    },

    clearLogs() {
        consoleLogs.length = 0;
    },

    cleanUp() {
        consoleLog.mockRestore();
    }
}