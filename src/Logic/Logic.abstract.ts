export interface CpuStrategy {
    getMove(board: string[]): number;
}

export class EasyCpuStrategy implements CpuStrategy {
    getMove(board: string[]): number {
        const emptyCells = board.map((cell, index) => cell === '' ? index : null).filter((cell): cell is number => cell !== null);
        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }
}

