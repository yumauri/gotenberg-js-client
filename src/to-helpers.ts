import {
  FieldsModifier,
  MarginOptions,
  PaperOptions,
  RequestFields,
} from './_types'
import {
  A3,
  A4,
  A5,
  A6,
  LARGE_MARGINS,
  LEGAL,
  LETTER,
  NO_MARGINS,
  NORMAL_MARGINS,
  TABLOID,
} from './page'

/**
 * Empty form field modifier, do nothing
 */
const noop: FieldsModifier = () => undefined

/**
 * Modifies `landscape` form field to be true
 */
export const landscape: FieldsModifier = (fields: RequestFields) =>
  (fields.landscape = true)

/**
 * Modifies `landscape` form field to be undefined (~ false)
 */
export const portrait: FieldsModifier = (fields: RequestFields) =>
  (fields.landscape = undefined) // == portrait is default orientation

/**
 * Modifies paper size
 */
export function paperSize(paper?: PaperOptions): FieldsModifier {
  if (!paper) return noop
  return (fields: RequestFields) => {
    if (Array.isArray(paper)) {
      ;[fields.paperWidth, fields.paperHeight] = paper
    } else {
      ;({ width: fields.paperWidth, height: fields.paperHeight } = paper)
    }
  }
}

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
export function marginSizes(margins?: MarginOptions): FieldsModifier {
  if (!margins) return noop
  return (fields: RequestFields) => {
    if (Array.isArray(margins)) {
      ;[
        fields.marginTop,
        fields.marginRight,
        fields.marginBottom,
        fields.marginLeft,
      ] = margins
    } else {
      ;({
        top: fields.marginTop,
        right: fields.marginRight,
        bottom: fields.marginBottom,
        left: fields.marginLeft,
      } = margins)
    }
  }
}

// some predefined margins modifiers
export const noMargins = marginSizes(NO_MARGINS)
export const normalMargins = marginSizes(NORMAL_MARGINS)
export const largeMargins = marginSizes(LARGE_MARGINS)
