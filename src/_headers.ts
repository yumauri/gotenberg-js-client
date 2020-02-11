import { HttpHeaders, Request } from './_types'

/**
 * Adjust Request headers, by extending `headers`
 * @return new Request, doesn't modify original Request
 */
export function headers<RequestEx extends Request>(headers: HttpHeaders) {
  return (request: RequestEx): RequestEx => ({
    ...request,
    headers: {
      ...request.headers,
      ...headers,
    },
  })
}
