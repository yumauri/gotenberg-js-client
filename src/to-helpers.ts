import { FieldsModifier, MarginOptions, PaperOptions } from './_types'
import { setProperty } from './tools/fn'
import {
  A3,
  A4,
  A5,
  A6,
  LARGE_MARGINS,
  LEGAL,
  LETTER,
  NORMAL_MARGINS,
  NO_MARGINS,
  TABLOID,
} from './page'

/**
 * Modifies `landscape` form field to be true
 */
export const landscape: FieldsModifier = setProperty('landscape')(true)

/**
 * Modifies `landscape` form field to be undefined (~ false)
 */
export const portrait: FieldsModifier = setProperty('landscape')() // == portrait is default orientation

/**
 * Modifies paper size
 */
export const paperSize = (paper: PaperOptions): FieldsModifier =>
  Array.isArray(paper)
    ? setProperty('paperWidth', 'paperHeight')(...paper)
    : setProperty('paperWidth', 'paperHeight')(paper.width, paper.height)

// some predefined paper size modifiers
export const a3 = paperSize(A3)
export const a4 = paperSize(A4)
export const a5 = paperSize(A5)
export const a6 = paperSize(A6)
export const legal = paperSize(LEGAL)
export const letter = paperSize(LETTER)
export const tabloid = paperSize(TABLOID)

/**
 * Modifies margins
 */
export const marginSizes = (margins: MarginOptions): FieldsModifier =>
  Array.isArray(margins)
    ? setProperty('marginTop', 'marginRight', 'marginBottom', 'marginLeft')(...margins)
    : setProperty('marginTop', 'marginRight', 'marginBottom', 'marginLeft')(
        margins.top,
        margins.right,
        margins.bottom,
        margins.left
      )

// some predefined margins modifiers
export const noMargins = marginSizes(NO_MARGINS)
export const normalMargins = marginSizes(NORMAL_MARGINS)
export const largeMargins = marginSizes(LARGE_MARGINS)
