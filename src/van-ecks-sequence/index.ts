
// Exercice from https://www.codingame.com/ide/puzzle/van-ecks-sequence

export default function vanEcksSequence(readline: () => string) {
    const A1: number = parseInt(readline());
    const N: number = parseInt(readline());

    const lastSeenIndices = new Map();
    let An = A1;
    for (let i = 0; i < N - 1; ++i) {
        const index = lastSeenIndices.get(An) ?? i;
        lastSeenIndices.set(An, i);
        An = i - index;
    }

    console.log(An);
}