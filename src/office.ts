import { OfficeRequest, Request, RequestType } from './_types'
import { pipe } from './tools/pipe'
import { path } from './internal/path'
import { type } from './internal/type'

/**
 * Adjust Request url, by adding `/office` to it
 * @return new OfficeRequest, doesn't modify original Request
 */
export const office: {
  (request: Request): OfficeRequest
} = pipe(path('/office'), type(RequestType.Office))
