import FormData from 'form-data'

////////////////////////////////////////////////////////////////////////////////
/// gotenberg client ///////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/**
 * Gotenberg client interface
 */
export interface GotenbergClient {
  post: (url: string, data: FormData) => Promise<NodeJS.ReadableStream>
  get?: (url: string) => Promise<NodeJS.ReadableStream>
}

/**
 * Gotenberg client interface with configurator function
 * Will be called with config third gotenberg object
 */
export interface GotenbergClientFunction {
  (config?: object): GotenbergClient
}

/**
 * Gotenberg client class interface
 * Will be initialized with `new (config)` third gotenberg object
 */
export interface GotenbergClientClass {
  new (config?: object): GotenbergClient
}
