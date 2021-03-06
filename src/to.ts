import { ConversionOptions, MarginOptions, PaperOptions, Request, RequestFields } from './_types'
import { fields } from './internal/fields'
import { marginSizes, paperSize } from './to-helpers'

/**
 * Adjust Request fields, for any request
 * @return new typed Request, doesn't modify original Request
 */
export const to: {
  <RequestEx extends Request>(...opts: ConversionOptions[]): (request: RequestEx) => RequestEx
} = (...opts): any => {
  const options: RequestFields = {}

  // page size and margins options
  let paper: PaperOptions | undefined
  let margins: MarginOptions | undefined

  // check every given option
  for (let i = opts.length; i--; ) {
    const op = opts[i]

    // this is fields modifier helper
    if (typeof op === 'function') {
      op(options)
      continue
    }

    // this is definitely page size or margins
    if (Array.isArray(op)) {
      if (op.length === 2) paper = op as [number, number]
      if (op.length === 4) margins = op as [number, number, number, number]
      continue
    }

    // check if options is page size object
    if ('width' in op || 'height' in op) {
      paper = op
      continue
    }

    // check if options is margins object
    if ('top' in op || 'right' in op || 'bottom' in op || 'left' in op) {
      margins = op
      continue
    }

    // check page field
    if ('paper' in op && op.paper) {
      paper = op.paper
      op.paper = undefined // eliminate page from option
    }

    // check margins field
    if ('margins' in op && op.margins) {
      margins = op.margins
      op.margins = undefined // eliminate margins from option
    }

    // extends result options with given option
    Object.assign(options, op)
  }

  // update page size and margins, if we have some
  paper && paperSize(paper)(options)
  margins && marginSizes(margins)(options)

  return fields(options)
}
