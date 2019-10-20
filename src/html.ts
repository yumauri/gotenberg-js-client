import {
  ChromeRequestFields,
  HtmlRequest,
  Request,
  RequestType,
} from './_types'
import pipe from './_pipe'
import fields from './_fields'
import path from './_path'
import type from './_type'

/**
 * Adjust Request url, by adding `/html` to it; Add request parameters
 * @return new HtmlRequest, doesn't modify original Request
 */
function html(o: ChromeRequestFields): (r: Request) => HtmlRequest

/**
 * Adjust Request url, by adding `/html` to it
 * @return new HtmlRequest, doesn't modify original Request
 */
function html(r: Request): HtmlRequest

// implementation
function html(x: Request | ChromeRequestFields) {
  return 'type' in x
    ? pipe(
        path('/html'),
        type(RequestType.Html)
      )(x)
    : pipe(
        fields(x),
        path('/html'),
        type(RequestType.Html)
      )
}

export default html
