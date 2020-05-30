import { Request, RequestType, UrlRequest } from './_types'
import { isString, isURL } from './internal/source-checkers'
import { pipe } from './tools/pipe'
import { fields } from './internal/fields'
import { path } from './internal/path'
import { type } from './internal/type'

/**
 * Adjust Request url, by adding `/url` to it; Set `remoteURL` from source
 * @return new HtmlRequest, doesn't modify original Request
 */
export const url: {
  (request: Request): UrlRequest
} = (request) => {
  if (!isString(request.source) && !isURL(request.source)) {
    throw new Error('Invalid source, should be url string or instance of URL')
  }

  return pipe(
    fields({
      remoteURL: request.source.toString(),

      // set all margins to 0
      // > Attention: when converting a website to PDF, you should remove all margins.
      // > If not, some of the content of the page might be hidden.
      // > @see https://thecodingmachine.github.io/gotenberg/#url.basic
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
    }),
    path('/url'),
    type(RequestType.Url)
  )({
    ...request,
    source: undefined, // eliminate source from Request
  })
}
