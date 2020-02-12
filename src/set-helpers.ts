import { FieldsModifier } from './_types'
import { setProperty } from './tools/fn'

/**
 * Modifies `resultFilename` form field
 */
export const filename: {
  (name: string): FieldsModifier
} = setProperty('resultFilename')

/**
 * Modifies `waitTimeout` form field
 *
 * By default, the value of the form field waitTimeout cannot be more than 30 seconds.
 * You may increase or decrease this limit thanks to the environment variable `MAXIMUM_WAIT_TIMEOUT`.
 * https://thecodingmachine.github.io/gotenberg/#environment_variables.maximum_wait_timeout
 */
export const timeout: {
  (timeout: number): FieldsModifier
} = setProperty('waitTimeout')

/**
 * Modifies `waitDelay` form field
 *
 * By default, the value of the form field waitDelay cannot be more than 10 seconds.
 * You may increase or decrease this limit thanks to the environment variable `MAXIMUM_WAIT_DELAY`.
 * https://thecodingmachine.github.io/gotenberg/#environment_variables.maximum_wait_delay
 */
export const delay: {
  (delay: number): FieldsModifier
} = setProperty('waitDelay')

/**
 * Modifies `webhookURL` and `webhookURLTimeout` form fields
 *
 * By default, the value of the form field webhookURLTimeout cannot be more than 30 seconds.
 * You may increase or decrease this limit thanks to the environment variable `MAXIMUM_WEBHOOK_URL_TIMEOUT`.
 * https://thecodingmachine.github.io/gotenberg/#environment_variables.maximum_webhook_url_timeout
 */
export const webhook: {
  (url: string, timeout?: number): FieldsModifier
} = setProperty('webhookURL', 'webhookURLTimeout')

/**
 * Modifies `googleChromeRpccBufferSize` form field
 *
 * You may increase this buffer size with the environment variable `DEFAULT_GOOGLE_CHROME_RPCC_BUFFER_SIZE`.
 * The hard limit is 100 MB (= 1_048_576_000 B) and is defined by Google Chrome itself.
 * https://thecodingmachine.github.io/gotenberg/#environment_variables.default_google_chrome_rpcc_buffer_size
 */
export const googleChromeRpccBufferSize: {
  (googleChromeRpccBufferSize: number): FieldsModifier
} = setProperty('googleChromeRpccBufferSize')

/**
 * Modifies `pageRanges` form field
 *
 * https://thecodingmachine.github.io/gotenberg/#html.page_ranges
 * https://thecodingmachine.github.io/gotenberg/#office.page_ranges
 */
export const range: {
  (range: string): FieldsModifier
} = setProperty('pageRanges')

/**
 * Modifies `scale` form field
 *
 * https://thecodingmachine.github.io/gotenberg/#html.paper_size_margins_orientation_scaling
 */
export const scale: {
  (scale: number): FieldsModifier
} = setProperty('scale')
