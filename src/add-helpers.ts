import { HeadersModifier, HttpHeaders } from './_types'

// https://thecodingmachine.github.io/gotenberg/#url.custom_http_headers

/**
 * Adds/Modifies single header for Url conversion
 */
export const header = (
  name: string,
  value: number | string
): HeadersModifier => (httpHeaders: HttpHeaders) =>
  (httpHeaders[`Gotenberg-Remoteurl-${name}`] = value)

/**
 * Adds/Modifies many headers for Url conversion
 */
export const headers = (headers: HttpHeaders): HeadersModifier => (
  httpHeaders: HttpHeaders
) => {
  for (const name in headers) {
    header(name, headers[name])(httpHeaders)
  }
  return httpHeaders
}

// https://thecodingmachine.github.io/gotenberg/#webhook.custom_http_headers

/**
 * Adds/Modifies single header for Webhook
 */
export const webhookHeader = (
  name: string,
  value: number | string
): HeadersModifier => (httpHeaders: HttpHeaders) =>
  (httpHeaders[`Gotenberg-Webhookurl-${name}`] = value)

/**
 * Adds/Modifies many headers for Webhook
 */
export const webhookHeaders = (headers: HttpHeaders): HeadersModifier => (
  httpHeaders: HttpHeaders
) => {
  for (const name in headers) {
    webhookHeader(name, headers[name])(httpHeaders)
  }
  return httpHeaders
}
