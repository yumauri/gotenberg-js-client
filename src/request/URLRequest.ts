import { FormValues, GotenbergRequest } from './_GotenbergRequest'
import { Request } from './_Request'

const REMOTE_URL = 'remoteURL'

/**
 * Request builder for remote URL conversions
 * https://thecodingmachine.github.io/gotenberg/#url
 */
export class URLRequest extends Request implements GotenbergRequest {
  constructor(private readonly url: string) {
    super()
  }

  //
  // Methods from GotenbergRequest
  //

  public getPostURL(): string {
    return '/convert/url'
  }

  public getFormValues(): FormValues {
    return {
      ...super.getFormValues(),
      [REMOTE_URL]: this.url,
    }
  }
}
