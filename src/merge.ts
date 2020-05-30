import { MergeRequest, Request, RequestType } from './_types'
import { isIterable, isObject } from './internal/source-checkers'
import { pipe } from './tools/pipe'
import { path } from './internal/path'
import { type } from './internal/type'

/**
 * Adjust Request url, by adding `/merge` to it
 * @return new MergeRequest, doesn't modify original Request
 */
export const merge: {
  (request: Request): MergeRequest
} = (request) => {
  if (!isIterable(request.source) && !isObject(request.source)) {
    throw new Error('Invalid source, should be iterable or object')
  }

  return pipe(path('/merge'), type(RequestType.Merge))(request)
}
