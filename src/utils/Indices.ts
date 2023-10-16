export type Indices<T extends readonly any[]> = Exclude<keyof T, keyof any[]>;
