import { HeadersModifier, HttpHeaders } from './_types'
import { setProperty } from './tools/fn'

// https://thecodingmachine.github.io/gotenberg/#url.custom_http_headers

/**
 * Adds/Modifies single header for Url conversion
 */
export const header = (name: string, value: number | string): HeadersModifier =>
  setProperty(`Gotenberg-Remoteurl-${name}`)(value)

/**
 * Adds/Modifies many headers for Url conversion
 */
export const headers = (headers: HttpHeaders): HeadersModifier => (_) => {
  for (const name in headers) {
    header(name, headers[name])(_)
  }
}

// https://thecodingmachine.github.io/gotenberg/#webhook.custom_http_headers

/**
 * Adds/Modifies single header for Webhook
 */
export const webhookHeader = (name: string, value: number | string): HeadersModifier =>
  setProperty(`Gotenberg-Webhookurl-${name}`)(value)

/**
 * Adds/Modifies many headers for Webhook
 */
export const webhookHeaders = (headers: HttpHeaders): HeadersModifier => (_) => {
  for (const name in headers) {
    webhookHeader(name, headers[name])(_)
  }
}
