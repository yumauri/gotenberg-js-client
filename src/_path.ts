import { Request } from './_types'

/**
 * Adjust Request fields, by adding given `path` to it
 * @return new Request, doesn't modify original Request
 */
function path(path: string) {
  return (request: Request): Request => ({
    ...request,
    url: (request.url || '') + path,
  })
}

export default path
