import FormData from 'form-data'
import { PingRequest, RequestFields, RequestType, TupleStreamsSource, TypedRequest } from './_types'
import { DEFAULT_FILENAME, toStreams } from './internal/source-converters'

/**
 * Helper function to convert fields and files to form data
 * https://github.com/form-data/form-data
 */
const formdata = (fields: RequestFields, files: TupleStreamsSource[]) => {
  const data = new FormData()

  // append all form values
  for (const field in fields) {
    if (fields.hasOwnProperty(field)) {
      const value = fields[field]
      if (value !== undefined) {
        data.append(field, String(value))
      }
    }
  }

  // append all form files
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    data.append(file[0], file[1], { filename: file[0] })
  }

  return data
}

/**
 * Validate sources' file names
 */
const validateSources = (
  type: RequestType,
  sources: TupleStreamsSource[]
): TupleStreamsSource[] => {
  const filenames = sources.map((source) => source[0])

  // check for duplicates
  const duplicates = filenames.filter((name, index, arr) => arr.indexOf(name) !== index)
  if (duplicates.length > 0) {
    throw new Error(`There are duplicates in file names: ${duplicates.join(',')}`)
  }

  // check sources against request type

  const hasDefault = filenames.includes(DEFAULT_FILENAME)
  if ((type === RequestType.Html || type === RequestType.Markdown) && !hasDefault) {
    throw new Error(
      `File "${DEFAULT_FILENAME}" is required for ${
        type === RequestType.Html ? 'HTML' : 'Markdown'
      } conversion`
    )
  }

  if (type === RequestType.Office && hasDefault) {
    throw new Error(
      `Default filename "${DEFAULT_FILENAME}" is not allowed for Office conversion, ` +
        `looks like you didn't set filename for document`
    )
  }

  return sources
}

/**
 * Send actual request to Gotenberg
 * @return ReadableStream
 */
export const please: {
  <T extends PingRequest>(request: T): Promise<void>
  <T extends TypedRequest>(request: T): Promise<NodeJS.ReadableStream>
} = (request: TypedRequest): any => {
  // ping request
  // https://thecodingmachine.github.io/gotenberg/#ping
  if (request.type === RequestType.Ping) {
    if (typeof request.client.get === 'function') {
      return request.client.get(request.url).then((response) => {
        // https://nodejs.org/docs/latest-v10.x/api/http.html#http_class_http_clientrequest
        // If no 'response' handler is added, then the response will be entirely discarded.
        // However, if a 'response' event handler is added, then the data from the response
        // object must be consumed, either by calling response.read() whenever there is
        // a 'readable' event, or by adding a 'data' handler, or by calling the .resume() method.
        // Until the data is consumed, the 'end' event will not fire. Also, until the data
        // is read it will consume memory that can eventually lead to a 'process out of memory' error.
        response.resume()
      })
    }
    throw new Error(`Gotenberg client doesn't implements "get" method`)
  }

  // any other conversion request
  const sources = validateSources(request.type, toStreams(request.source))
  const form = formdata(request.fields, sources)
  return request.client.post(request.url, form, request.headers)
}
