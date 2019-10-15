import * as FromData from 'form-data'
import { HttpAdapter } from '../http/_Adapter'
import { NativeAdapter } from '../http/NativeAdapter'
import { Request } from '../request/_Request'

/**
 * Helper function to convert Request to FormData
 * https://github.com/form-data/form-data
 */
const formdata = (request: Request) => {
  const data = new FromData()

  // append all form values
  const values = request.getFormValues()
  for (const field in values) {
    if (values.hasOwnProperty(field)) {
      const value = values[field]
      if (value !== undefined) {
        data.append(field, String(value))
      }
    }
  }

  // append all form files
  const files = request.getFormFiles()
  for (const filename in files) {
    if (files.hasOwnProperty(filename)) {
      const document = files[filename]
      if (document !== undefined) {
        data.append(filename, document.getStream(), { filename })
      }
    }
  }

  return data
}

/**
 * Gotenberg client
 */
export class Client {
  constructor(
    private readonly url: string,
    private readonly client: HttpAdapter = new NativeAdapter()
  ) {}

  public do(request: Request): Promise<NodeJS.ReadableStream> {
    return this.client.post(this.url + request.getPostURL(), formdata(request))
  }
}
