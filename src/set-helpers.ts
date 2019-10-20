import { FieldsModifier, RequestFields } from './_types'

/**
 * Modifies `resultFilename` form field
 */
export const filename = (name: string): FieldsModifier => (
  fields: RequestFields
) => (fields.resultFilename = name)

/**
 * Modifies `waitTimeout` form field
 *
 * By default, the value of the form field waitTimeout cannot be more than 30 seconds.
 * You may increase or decrease this limit thanks to the environment variable `MAXIMUM_WAIT_TIMEOUT`.
 * https://thecodingmachine.github.io/gotenberg/#environment_variables.maximum_wait_timeout
 */
export const timeout = (timeout: number): FieldsModifier => (
  fields: RequestFields
) => (fields.waitTimeout = timeout)

/**
 * Modifies `waitDelay` form field
 *
 * By default, the value of the form field waitDelay cannot be more than 10 seconds.
 * You may increase or decrease this limit thanks to the environment variable `MAXIMUM_WAIT_DELAY`.
 * https://thecodingmachine.github.io/gotenberg/#environment_variables.maximum_wait_delay
 */
export const delay = (delay: number): FieldsModifier => (
  fields: RequestFields
) => (fields.waitDelay = delay)

/**
 * Modifies `webhookURL` and `webhookURLTimeout` form fields
 *
 * By default, the value of the form field webhookURLTimeout cannot be more than 30 seconds.
 * You may increase or decrease this limit thanks to the environment variable `MAXIMUM_WEBHOOK_URL_TIMEOUT`.
 * https://thecodingmachine.github.io/gotenberg/#environment_variables.maximum_webhook_url_timeout
 */
export const webhook = (url: string, timeout?: number): FieldsModifier => (
  fields: RequestFields
) => {
  fields.webhookURL = url
  fields.webhookURLTimeout = timeout
}

/**
 * Modifies `googleChromeRpccBufferSize` form field
 *
 * You may increase this buffer size with the environment variable `DEFAULT_GOOGLE_CHROME_RPCC_BUFFER_SIZE`.
 * The hard limit is 100 MB (= 1_048_576_000 B) and is defined by Google Chrome itself.
 * https://thecodingmachine.github.io/gotenberg/#environment_variables.default_google_chrome_rpcc_buffer_size
 */
export const googleChromeRpccBufferSize = (
  googleChromeRpccBufferSize: number
): FieldsModifier => (fields: RequestFields) =>
  (fields.googleChromeRpccBufferSize = googleChromeRpccBufferSize)
