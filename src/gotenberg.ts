import {
  GotenbergClient,
  GotenbergClientClass,
  GotenbergClientFunction,
} from './client'
import native from './client/native'
import { Request, RequestType, Source } from './_types'

/**
 * Initializes Gotenberg request
 */
function gotenberg(
  url: string | Buffer | URL,
  client?:
    | GotenbergClient
    | GotenbergClientFunction
    | GotenbergClientClass
    | object,
  config?: object
) {
  let clnt: GotenbergClient

  // if GotenbergClient object / instance provided -> just use it
  if (typeof client === 'object' && 'post' in client) {
    clnt = client
  }

  // if GotenbergClientFunction or GotenbergClientClass -> call or instantiate it
  else if (typeof client === 'function') {
    // there is no good way to distinguish regular function from class,
    // hope this will do ¯\_(ツ)_/¯
    if (/^class\s/.test(Function.prototype.toString.call(client))) {
      // guess this is GotenbergClientClass
      clnt = new (client as GotenbergClientClass)(config)
    } else {
      // guess this is GotenbergClientFunction
      clnt = (client as GotenbergClientFunction)(config)
    }
  }

  // there is config object instead of client given
  // (or maybe it is just undefined)
  // -> use native client
  else {
    clnt = native(config || client)
  }

  return (source: Source): Request => ({
    type: RequestType.Undefined,
    url: url.toString(),
    client: clnt,
    source,
    fields: {},
  })
}

export default gotenberg
