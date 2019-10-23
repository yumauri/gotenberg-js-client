import http from 'http'
import https from 'https'
import FormData from 'form-data'
import { GotenbergClientFunction } from './'

/**
 * Little helper to parse url and get needed request method - either HTTP or HTTPS
 * @param url
 */
const parse = (
  url: string
): [URL, typeof http.request | typeof https.request] => {
  const _url = new URL(url)
  const request = _url.protocol === 'http:' ? http.request : https.request
  return [_url, request]
}

/**
 * Perform POST request to Gotenberg API
 */
export function post(
  this: object | null,
  url: string,
  data: FormData
): Promise<NodeJS.ReadableStream> {
  const [_url, request] = parse(url)
  return new Promise((resolve, reject) => {
    const req = request(_url, {
      method: 'POST',
      headers: data.getHeaders(),
      ...this, // extends with config options
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
    // pipe should automatically call `req.end()` after stream ends
  })
}

/**
 * Perform POST request to Gotenberg API
 */
export function get(
  this: object | null,
  url: string
): Promise<NodeJS.ReadableStream> {
  const [_url, request] = parse(url)
  return new Promise((resolve, reject) => {
    const req = request(_url, {
      method: 'GET',
      ...this, // extends with config options
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

    req.end() // send request
  })
}

/**
 * GotenbergClient function implementation.
 *
 * Uses native Nodejs modules `http` and `https`, can accept any options
 * for http -> https://nodejs.org/docs/latest-v10.x/api/http.html#http_http_request_options_callback
 * for https -> https://nodejs.org/docs/latest-v10.x/api/https.html#https_https_request_options_callback
 */
const client: GotenbergClientFunction = (config?: object) => ({
  post: post.bind(config || null),
  get: get.bind(config || null),
})

// some trick to export typed value
export default client
