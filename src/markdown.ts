import {
  ChromeRequestFields,
  MarkdownRequest,
  Request,
  RequestType,
} from './_types'
import pipe from './_pipe'
import fields from './_fields'
import path from './_path'
import type from './_type'

/**
 * Adjust Request url, by adding `/markdown` to it; Add request parameters
 * @return new MarkdownRequest, doesn't modify original Request
 */
function markdown(o: ChromeRequestFields): (r: Request) => MarkdownRequest

/**
 * Adjust Request url, by adding `/markdown` to it
 * @return new MarkdownRequest, doesn't modify original Request
 */
function markdown(r: Request): MarkdownRequest

// implementation
function markdown(x: Request | ChromeRequestFields) {
  return 'type' in x
    ? pipe(
        path('/markdown'),
        type(RequestType.Markdown)
      )(x)
    : pipe(
        fields(x),
        path('/markdown'),
        type(RequestType.Markdown)
      )
}

export default markdown
