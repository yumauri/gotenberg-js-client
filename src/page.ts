export type PageSize = [number, number] | { width?: number; height?: number }
export type Margins =
  | [number, number, number, number]
  | { top?: number; right?: number; bottom?: number; left?: number }

// TODO: more sizes
// https://papersizes.io/

export const A3: PageSize = [11.7, 16.5]
export const A4: PageSize = [8.27, 11.7]
export const A5: PageSize = [5.8, 8.3]
export const A6: PageSize = [4.1, 5.8]
export const LETTER: PageSize = [8.5, 11]
export const LEGAL: PageSize = [8.5, 14]
export const TABLOID: PageSize = [11, 17]

export const NO_MARGINS: Margins = [0, 0, 0, 0]
export const NORMAL_MARGINS: Margins = [1, 1, 1, 1]
export const LARGE_MARGINS: Margins = [2, 2, 2, 2]
