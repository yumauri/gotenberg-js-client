import { FormFiles, GotenbergRequest } from './_GotenbergRequest'
import { Request } from './_Request'
import { Document, reduce } from '../document/_Document'

/**
 * Request builder for merging PDFs
 * https://thecodingmachine.github.io/gotenberg/#merge
 */
export class MergeRequest extends Request implements GotenbergRequest {
  private readonly _files: Document[]

  constructor(...files: Document[]) {
    super()
    this._files = files
  }

  //
  // Methods from GotenbergRequest
  //

  public getPostURL(): string {
    return '/merge'
  }

  public getFormFiles(): FormFiles {
    return {
      ...super.getFormFiles(),
      ...reduce(this._files),
    }
  }
}
