import {
  ConversionOptions,
  HtmlRequest,
  MarginOptions,
  MarkdownRequest,
  OfficeRequest,
  PaperOptions,
  Request,
  RequestFields,
} from './_types'
import fields from './_fields'
import { marginSizes, paperSize } from './to-helpers'

/**
 * Adjust Request fields, for html, markdown or office requests
 * @return new Request (Html|Markdown|Office), doesn't modify original Request
 */
function to(...opts: ConversionOptions[]): (request: HtmlRequest) => HtmlRequest
function to(
  ...opts: ConversionOptions[]
): (request: OfficeRequest) => OfficeRequest
function to(
  ...opts: ConversionOptions[]
): (request: MarkdownRequest) => MarkdownRequest

// implementation
function to<RequestEx extends Request>(...opts: ConversionOptions[]) {
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
  paperSize(paper)(options)
  marginSizes(margins)(options)

  return fields<RequestEx>(options)
}

export default to
