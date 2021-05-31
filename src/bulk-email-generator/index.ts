
// Exercice from https://www.codingame.com/ide/puzzle/bulk-email-generator

export default function bulkMailGenerator(readline: () => string) {
    const N = parseInt(readline());
    const lines = [];
    for (let i = 0; i < N; i++) {
        lines.push(readline());
    }
    let index = 0;
    const output = lines
        .join("\n")
        .replace(/\(([^\)]*(?:\|[^\)]*)*)\)/g, (_, match: string) => {
            const tokens = match.split("|");
            return tokens[(index++) % tokens.length];
        });
    console.log(output);
}