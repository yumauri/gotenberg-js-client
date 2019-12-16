import { HeadersModifier, HttpHeaders, Request } from './_types'
import headers from './_headers'

/**
 * Adjust Request headers, for any request
 * @return new typed Request, doesn't modify original Request
 */
function add<RequestEx extends Request>(...opts: Array<HeadersModifier>) {
  const httpHeaders: HttpHeaders = {}

  // check every given option
  for (let i = opts.length; i--; ) {
    const op = opts[i]
    op(httpHeaders)
  }

  return headers<RequestEx>(httpHeaders)
}

export default add
