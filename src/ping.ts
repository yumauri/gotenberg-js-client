import { PingRequest, Request, RequestType } from './_types'
import { pipe } from './_pipe'
import { path } from './_path'
import { type } from './_type'

/**
 * Adjust Request url, by adding `/ping` to it
 * @return new PingRequest, doesn't modify original Request
 */
export const ping: {
  (request: Request): PingRequest
} = pipe(path('/ping'), type(RequestType.Ping))
