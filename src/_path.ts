import { Request } from './_types'

/**
 * Adjust Request fields, by adding given `path` to it
 * @return new Request, doesn't modify original Request
 */
export function path(path: string) {
  return (request: Request): Request => ({
    ...request,
    url: (request.url || '') + path,
  })
}
