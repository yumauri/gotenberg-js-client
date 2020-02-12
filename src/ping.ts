import { PingRequest, Request, RequestType } from './_types'
import { pipe } from './tools/pipe'
import { path } from './internal/path'
import { type } from './internal/type'

/**
 * Adjust Request url, by adding `/ping` to it
 * @return new PingRequest, doesn't modify original Request
 */
export const ping: {
  (request: Request): PingRequest
} = pipe(path('/ping'), type(RequestType.Ping))
