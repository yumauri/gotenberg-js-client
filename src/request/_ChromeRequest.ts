import { FormFiles, FormValues, GotenbergRequest } from './_GotenbergRequest'
import { Request } from './_Request'
import { Document } from '../document/_Document'
import { Margins, PageSize } from '../page'

const HEADER_TEMPLATE = 'header.html'
const FOOTER_TEMPLATE = 'footer.html'

const WAIT_DELAY = 'waitDelay'
const PAPER_WIDTH = 'paperWidth'
const PAPER_HEIGHT = 'paperHeight'
const MARGIN_TOP = 'marginTop'
const MARGIN_BOTTOM = 'marginBottom'
const MARGIN_LEFT = 'marginLeft'
const MARGIN_RIGHT = 'marginRight'
const LANDSCAPE = 'landscape'
const GOOGLE_CHROME_RPCC_BUFFER_SIZE = 'googleChromeRpccBufferSize'

/**
 * Abstract ChromeRequest builder for gotenberg headless chrome (HTML and Markdown) conversions
 */
export abstract class ChromeRequest extends Request
  implements GotenbergRequest {
  private _header?: Document
  private _footer?: Document
  private _waitDelay?: number
  private _paperWidth?: number
  private _paperHeight?: number
  private _marginTop?: number
  private _marginBottom?: number
  private _marginLeft?: number
  private _marginRight?: number
  private _landscape? = false
  private _googleChromeRpccBufferSize?: number

  //
  // Methods from GotenbergRequest
  //

  public getFormValues(): FormValues {
    return {
      ...super.getFormValues(),
      [WAIT_DELAY]: this._waitDelay,
      [PAPER_WIDTH]: this._paperWidth,
      [PAPER_HEIGHT]: this._paperHeight,
      [MARGIN_TOP]: this._marginTop,
      [MARGIN_BOTTOM]: this._marginBottom,
      [MARGIN_LEFT]: this._marginLeft,
      [MARGIN_RIGHT]: this._marginRight,
      [GOOGLE_CHROME_RPCC_BUFFER_SIZE]: this._googleChromeRpccBufferSize,
      [LANDSCAPE]: this._landscape,
    }
  }

  public getFormFiles(): FormFiles {
    return {
      ...super.getFormFiles(),
      [HEADER_TEMPLATE]: this._header,
      [FOOTER_TEMPLATE]: this._footer,
    }
  }

  //
  // Setters for private fields
  //

  public header(header: Document): ChromeRequest {
    this._header = header
    return this
  }

  public footer(footer: Document): ChromeRequest {
    this._footer = footer
    return this
  }

  public waitDelay(value: number): ChromeRequest {
    this._waitDelay = value
    return this
  }

  public paperSize(size: PageSize): ChromeRequest {
    if (Array.isArray(size)) {
      ;[this._paperWidth, this._paperHeight] = size
    } else {
      ;({ width: this._paperWidth, height: this._paperHeight } = size)
    }
    return this
  }

  public paperWidth(value: number): ChromeRequest {
    this._paperWidth = value
    return this
  }

  public paperHeight(value: number): ChromeRequest {
    this._paperHeight = value
    return this
  }

  public margins(margins: Margins): ChromeRequest {
    if (Array.isArray(margins)) {
      ;[
        this._marginTop,
        this._marginRight,
        this._marginBottom,
        this._marginLeft,
      ] = margins
    } else {
      ;({
        top: this._marginTop,
        right: this._marginRight,
        bottom: this._marginBottom,
        left: this._marginLeft,
      } = margins)
    }
    return this
  }

  public marginTop(value: number): ChromeRequest {
    this._marginTop = value
    return this
  }

  public marginRight(value: number): ChromeRequest {
    this._marginRight = value
    return this
  }

  public marginBottom(value: number): ChromeRequest {
    this._marginBottom = value
    return this
  }

  public marginLeft(value: number): ChromeRequest {
    this._marginLeft = value
    return this
  }

  public landscape(value: boolean): ChromeRequest {
    this._landscape = value
    return this
  }

  public googleChromeRpccBufferSize(value: number): ChromeRequest {
    this._googleChromeRpccBufferSize = value
    return this
  }
}
