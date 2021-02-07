import { Request } from './_types'

/**
 * Recursively merge requests
 */
const merge = <RequestEx extends Request>(request: RequestEx, modify: Partial<Request>) => {
  const result = { ...request, ...modify }

  for (const key in modify) {
    if (
      modify[key] &&
      request[key] &&
      typeof modify[key] === 'object' &&
      typeof request[key] === 'object'
    ) {
      result[key] = merge(request[key], modify[key])
    }
  }

  return result
}

/**
 * Adjust any Request *object* fields, for any request
 * @return new typed Request, doesn't modify original Request
 */
export const adjust: {
  <RequestEx extends Request>(modify: Partial<Request>): (request: RequestEx) => RequestEx
} = (modify) => (request) => merge(request, modify)
