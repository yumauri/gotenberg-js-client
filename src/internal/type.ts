import {
  HtmlRequest,
  MarkdownRequest,
  MergeRequest,
  OfficeRequest,
  PingRequest,
  Request,
  RequestType,
  UrlRequest,
} from '../_types'

/**
 * Adjust Request fields, by changing `type`
 * @return new typed Request, doesn't modify original Request
 */
export const type: {
  (type: RequestType.Url): (request: Request) => UrlRequest
  (type: RequestType.Ping): (request: Request) => PingRequest
  (type: RequestType.Html): (request: Request) => HtmlRequest
  (type: RequestType.Merge): (request: Request) => MergeRequest
  (type: RequestType.Office): (request: Request) => OfficeRequest
  (type: RequestType.Markdown): (request: Request) => MarkdownRequest
} = (type: RequestType) => (request: Request): any => {
  if ('type' in request && request.type !== RequestType.Undefined) {
    throw new Error(
      `Cannot set "${RequestType[type]}" conversion, already set to "${RequestType[request.type]}"`
    )
  }

  return {
    ...request,
    type,
  }
}
