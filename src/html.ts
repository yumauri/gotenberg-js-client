import { ChromeRequestFields, HtmlRequest, Request, RequestType } from './_types'
import { pipe } from './_pipe'
import { fields } from './_fields'
import { path } from './_path'
import { type } from './_type'

/**
 * Adjust Request url, by adding `/html` to it; Can add request parameters
 * @return new HtmlRequest, doesn't modify original Request
 */
export const html: {
  (o: ChromeRequestFields): (r: Request) => HtmlRequest
  (r: Request): HtmlRequest
} = (x: Request | ChromeRequestFields): any =>
  'type' in x
    ? pipe(path('/html'), type(RequestType.Html))(x)
    : pipe(fields(x), path('/html'), type(RequestType.Html))
