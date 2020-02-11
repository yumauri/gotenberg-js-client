import {
  HtmlRequest,
  MarkdownRequest,
  MergeRequest,
  OfficeRequest,
  PingRequest,
  Request,
  RequestType,
  UrlRequest,
} from './_types'

/**
 * Adjust Request fields, by changing `type`
 * @return new typed Request, doesn't modify original Request
 */
export function type(type: RequestType.Url): (request: Request) => UrlRequest
export function type(type: RequestType.Ping): (request: Request) => PingRequest
export function type(type: RequestType.Html): (request: Request) => HtmlRequest
export function type(
  type: RequestType.Merge
): (request: Request) => MergeRequest
export function type(
  type: RequestType.Office
): (request: Request) => OfficeRequest
export function type(
  type: RequestType.Markdown
): (request: Request) => MarkdownRequest

// implementation
export function type(type: RequestType) {
  return (request: Request): Request => ({
    ...request,
    type,
  })
}
