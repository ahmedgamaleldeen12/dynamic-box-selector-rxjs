export interface Salto {
    id: string;
    symbol: string;
    value: number;
}

export const frontSaltos: Salto[] = [
    { id: 'fst-1', symbol: 'FT', value: 0.3 },
    { id: 'fst-2', symbol: 'FP', value: 0.4 },
    { id: 'fst-3', symbol: 'FS', value: 0.5 },
    { id: 'fst-4', symbol: 'F½', value: 0.6 },
    { id: 'fst-5', symbol: 'F1', value: 0.7 },
    { id: 'fst-6', symbol: 'F2', value: 0.9 },
    { id: 'fst-7', symbol: 'F↔', value: 0.8 },
    { id: 'fst-8', symbol: 'FMT', value: 0.2 },
    { id: 'fst-9', symbol: 'FHF', value: 0.6 },
    { id: 'fst-10', symbol: 'FDR', value: 0.5 }
];

export const backSaltos: Salto[] = [
    { id: 'bst-1', symbol: 'BT', value: 0.3 },
    { id: 'bst-2', symbol: 'BP', value: 0.4 },
    { id: 'bst-3', symbol: 'BS', value: 0.5 },
    { id: 'bst-4', symbol: 'B½', value: 0.6 },
    { id: 'bst-5', symbol: 'B1', value: 0.7 },
    { id: 'bst-6', symbol: 'B2', value: 0.9 },
    { id: 'bst-7', symbol: 'B↔', value: 0.8 },
    { id: 'bst-8', symbol: 'BPM', value: 0.25 },
    { id: 'bst-9', symbol: 'RBT', value: 0.6 },
    { id: 'bst-10', symbol: 'RFB', value: 0.7 }
];

export const boxes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']