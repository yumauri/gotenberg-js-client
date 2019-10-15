import { FormFiles, FormValues, GotenbergRequest } from './_GotenbergRequest'
import { Request } from './_Request'
import { Document, reduce } from '../document/_Document'

const LANDSCAPE = 'landscape'

/**
 * Request builder for Office document conversions
 * https://thecodingmachine.github.io/gotenberg/#office
 */
export class OfficeRequest extends Request implements GotenbergRequest {
  private readonly _files: Document[]
  private _landscape? = false

  constructor(...files: Document[]) {
    super()
    this._files = files || []
  }

  //
  // Methods from GotenbergRequest
  //

  public getPostURL(): string {
    return '/convert/office'
  }

  public getFormValues(): FormValues {
    return {
      ...super.getFormValues(),
      [LANDSCAPE]: this._landscape,
    }
  }

  public getFormFiles(): FormFiles {
    return {
      ...super.getFormFiles(),
      ...reduce(this._files),
    }
  }

  //
  // Setters for private fields
  //

  public landscape(value: boolean): OfficeRequest {
    this._landscape = value
    return this
  }
}
