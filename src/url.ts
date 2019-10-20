import { Request, RequestType } from './_types'
import { isString, isURL } from './_source-checkers'
import pipe from './_pipe'
import fields from './_fields'
import path from './_path'
import type from './_type'

/**
 * Adjust Request url, by adding `/url` to it; Set `remoteURL` from source
 * @return new HtmlRequest, doesn't modify original Request
 */
function url(request: Request) {
  let remoteURL: string
  if (isString(request.source)) remoteURL = request.source
  else if (isURL(request.source)) remoteURL = request.source.toString()
  else {
    throw new Error('Invalid source, should be url string or instance of URL')
  }

  return pipe(
    fields({
      remoteURL,

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

export default url
