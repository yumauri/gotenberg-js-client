import { ChromeRequestFields, MarkdownRequest, Request, RequestType } from './_types'
import { pipe } from './_pipe'
import { fields } from './_fields'
import { path } from './_path'
import { type } from './_type'

/**
 * Adjust Request url, by adding `/markdown` to it; Can add request parameters
 * @return new MarkdownRequest, doesn't modify original Request
 */
export const markdown: {
  (o: ChromeRequestFields): (r: Request) => MarkdownRequest
  (r: Request): MarkdownRequest
} = (x: Request | ChromeRequestFields): any =>
  'type' in x
    ? pipe(path('/markdown'), type(RequestType.Markdown))(x)
    : pipe(fields(x), path('/markdown'), type(RequestType.Markdown))
