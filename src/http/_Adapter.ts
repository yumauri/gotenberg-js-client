import * as FormData from 'form-data'

export abstract class HttpAdapter {
  abstract post(
    url: URL | string,
    data: FormData
  ): Promise<NodeJS.ReadableStream>
}
