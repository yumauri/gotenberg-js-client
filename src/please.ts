import FormData from 'form-data'
import {
  PingRequest,
  RequestFields,
  RequestType,
  TupleStreamsSource,
  TypedRequest,
} from './_types'
import { toStreams } from './_source-converters'

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
 * Send actual request to Gotenberg
 * @return ReadableStream
 */
function please<T extends TypedRequest>(
  request: T
): T extends PingRequest ? Promise<void> : Promise<NodeJS.ReadableStream>

// implementation
function please(request: TypedRequest): Promise<NodeJS.ReadableStream | void> {
  // ping request
  // https://thecodingmachine.github.io/gotenberg/#ping
  if (request.type === RequestType.Ping) {
    if (typeof request.client.get === 'function') {
      return request.client.get(request.url).then(response => {
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
  const sources = toStreams(request.source)
  const form = formdata(request.fields, sources)
  return request.client.post(request.url, form)
}

export default please
