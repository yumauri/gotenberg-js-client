import { FormFiles, GotenbergRequest } from './_GotenbergRequest'
import { Document, reduce } from '../document/_Document'
import { HTMLRequest } from './HTMLRequest'

/**
 * Request builder for Markdown conversions
 * https://thecodingmachine.github.io/gotenberg/#markdown
 */
export class MarkdownRequest extends HTMLRequest implements GotenbergRequest {
  private readonly _markdowns: Document[]

  constructor(index: Document, ...markdowns: Document[]) {
    super(index)
    this._markdowns = markdowns
  }

  //
  // Methods from GotenbergRequest
  //

  public getPostURL() {
    return '/convert/markdown'
  }

  public getFormFiles(): FormFiles {
    return {
      ...super.getFormFiles(),
      ...reduce(this._markdowns),
    }
  }
}
