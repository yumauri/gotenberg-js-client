import { HeadersModifier, HttpHeaders, Request } from './_types'
import { headers } from './internal/headers'

/**
 * Adjust Request headers, for any request
 * @return new typed Request, doesn't modify original Request
 */
export const add: {
  <RequestEx extends Request>(...opts: HeadersModifier[]): (request: RequestEx) => RequestEx
} = (...opts) => {
  const httpHeaders: HttpHeaders = {}

  for (let i = opts.length; i--; ) {
    const op = opts[i]
    op(httpHeaders)
  }

  return headers(httpHeaders)
}
