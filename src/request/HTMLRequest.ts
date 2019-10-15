import { FormFiles, GotenbergRequest } from './_GotenbergRequest'
import { Document, reduce } from '../document/_Document'
import { ChromeRequest } from './_ChromeRequest'

const INDEX_TEMPLATE = 'index.html'

/**
 * Request builder for HTML conversions
 * https://thecodingmachine.github.io/gotenberg/#html
 */
export class HTMLRequest extends ChromeRequest implements GotenbergRequest {
  private _assets: Document[]

  constructor(private readonly index: Document, ...assets: Document[]) {
    super()
    this._assets = assets || []
  }

  //
  // Methods from GotenbergRequest
  //

  public getPostURL() {
    return '/convert/html'
  }

  public getFormFiles(): FormFiles {
    return {
      ...super.getFormFiles(),
      ...reduce(this._assets),
      [INDEX_TEMPLATE]: this.index,
    }
  }

  //
  // Setters for private fields
  //

  public assets(...assets: Document[]): HTMLRequest {
    this._assets = assets
    return this
  }
}
