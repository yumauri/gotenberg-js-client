import { Request } from '../_types'

/**
 * Adjust Request fields, by adding given `path` to it
 * @return new Request, doesn't modify original Request
 */
export const path = (path: string) => (request: Request): Request => ({
  ...request,
  url: (request.url || '') + path,
})
