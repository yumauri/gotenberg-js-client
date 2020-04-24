import { client as native } from './client/node'
import {
  GotenbergClient,
  GotenbergClientClass,
  GotenbergClientFunction,
  Request,
  RequestType,
  Source,
} from './_types'

/**
 * Initializes Gotenberg request
 */
export const gotenberg = (
  url: string | Buffer | URL,
  client?: GotenbergClient | GotenbergClientFunction | GotenbergClientClass | object,
  config?: object
) => {
  let instance: GotenbergClient

  // if GotenbergClient object / instance provided -> just use it
  if (typeof client === 'object' && 'post' in client) {
    instance = client
  }

  // if GotenbergClientFunction or GotenbergClientClass -> call or instantiate it
  else if (typeof client === 'function') {
    // there is no good way to distinguish regular function from class,
    // hope this will do ¯\_(ツ)_/¯
    if (/^class\s/.test(Function.prototype.toString.call(client))) {
      // guess this is GotenbergClientClass
      instance = new (client as GotenbergClientClass)(config)
    } else {
      // guess this is GotenbergClientFunction
      instance = (client as GotenbergClientFunction)(config)
    }
  }

  // there is config object instead of client given
  // (or maybe it is just undefined)
  // -> use native client
  else {
    instance = native(config || client)
  }

  return (source: Source): Request => ({
    type: RequestType.Undefined,
    url: url.toString(),
    client: instance,
    source,
    fields: {},
  })
}
