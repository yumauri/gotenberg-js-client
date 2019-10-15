import { FormFiles, FormValues, GotenbergRequest } from './_GotenbergRequest'

const RESULT_FILENAME = 'resultFilename'
const WAIT_TIMEOUT = 'waitTimeout'
const WEBHOOK_URL = 'webhookURL'
const WEBHOOK_URL_TIMEOUT = 'webhookURLTimeout'

/**
 * Abstract Request builder for gotenberg conversions
 */
export abstract class Request implements GotenbergRequest {
  private _resultFilename?: string
  private _waitTimeout?: number
  private _webhookURL?: string
  private _webhookURLTimeout?: number

  //
  // Methods from GotenbergRequest
  //

  abstract getPostURL(): string

  public getFormValues(): FormValues {
    return {
      [RESULT_FILENAME]: this._resultFilename,
      [WAIT_TIMEOUT]: this._waitTimeout,
      [WEBHOOK_URL]: this._webhookURL,
      [WEBHOOK_URL_TIMEOUT]: this._webhookURLTimeout,
    }
  }

  public getFormFiles(): FormFiles {
    return {}
  }

  //
  // Setters for private fields
  //

  public resultFilename(value: string): Request {
    this._resultFilename = value
    return this
  }

  public waitTimeout(value: number): Request {
    this._waitTimeout = value
    return this
  }

  public webhookURL(value: string): Request {
    this._webhookURL = value
    return this
  }

  public webhookURLTimeout(value: number): Request {
    this._webhookURLTimeout = value
    return this
  }
}
