import { HttpHeaders, Request } from '../_types'

/**
 * Adjust Request headers, by extending `headers`
 * @return new Request, doesn't modify original Request
 */
export const headers: {
  <RequestEx extends Request>(headers: HttpHeaders): (request: RequestEx) => RequestEx
} = (headers) => (request) => ({
  ...request,
  headers: {
    ...request.headers,
    ...headers,
  },
})
