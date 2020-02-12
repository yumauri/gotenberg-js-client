import { FieldsModifier, Request, RequestFields } from './_types'
import { fields } from './internal/fields'

/**
 * Adjust Request fields, for any request
 * @return new typed Request, doesn't modify original Request
 */
export const set: {
  <RequestEx extends Request>(...opts: (Partial<RequestFields> | FieldsModifier)[]): (
    request: RequestEx
  ) => RequestEx
} = (...opts) => {
  const options: RequestFields = {}

  for (let i = opts.length; i--; ) {
    const op = opts[i]
    if (typeof op === 'function') {
      op(options) // this is fields modifier helper -> apply it
    } else {
      Object.assign(options, op) // extends result options with given option
    }
  }

  return fields(options)
}
