import * as http from 'http'
import * as https from 'https'
import * as FormData from 'form-data'
import { HttpAdapter } from './_Adapter'

export class NativeAdapter extends HttpAdapter {
  public post(
    url: URL | string,
    data: FormData
  ): Promise<NodeJS.ReadableStream> {
    const _url = url instanceof URL ? url : new URL(url)
    const request = _url.protocol === 'http:' ? http.request : https.request

    return new Promise((resolve, reject) => {
      const req = request(_url, {
        method: 'POST',
        headers: data.getHeaders(),
        // auth <string> Basic authentication i.e. 'user:password' to compute an Authorization header.
        // timeout <number>: A number specifying the socket timeout in milliseconds. This will set the timeout before the socket is connected.
      })

      req.on('error', reject)
      req.on('response', res => {
        if (res.statusCode === 200) {
          resolve(res)
        } else {
          res.resume() // ignore response body
          reject(new Error(res.statusCode + ' ' + res.statusMessage))
        }
      })

      data.pipe(req) // pipe Form data to request
    })
  }
}
