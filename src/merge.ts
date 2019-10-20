import { Request, RequestType } from './_types'
import { isIterable, isObject } from './_source-checkers'
import pipe from './_pipe'
import path from './_path'
import type from './_type'

/**
 * Adjust Request url, by adding `/merge` to it
 * @return new MergeRequest, doesn't modify original Request
 */
function merge(request: Request) {
  if (!isIterable(request.source) && !isObject(request.source)) {
    throw new Error('Invalid source, should be iterable or object')
  }

  return pipe(
    path('/merge'),
    type(RequestType.Merge)
  )(request)
}

export default merge
