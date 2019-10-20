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
function type(type: RequestType.Url): (request: Request) => UrlRequest
function type(type: RequestType.Ping): (request: Request) => PingRequest
function type(type: RequestType.Html): (request: Request) => HtmlRequest
function type(type: RequestType.Merge): (request: Request) => MergeRequest
function type(type: RequestType.Office): (request: Request) => OfficeRequest
function type(type: RequestType.Markdown): (request: Request) => MarkdownRequest

// implementation
function type(type: RequestType) {
  return (request: Request): Request => ({
    ...request,
    type,
  })
}

export default type
