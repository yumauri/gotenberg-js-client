import { Request, RequestFields } from '../_types'

/**
 * Adjust Request fields, by extending `fields`
 * @return new Request, doesn't modify original Request
 */
export const fields: {
  <RequestEx extends Request>(fields: Partial<RequestFields>): (request: RequestEx) => RequestEx
} = (fields) => (request) => ({
  ...request,
  fields: {
    ...request.fields,
    ...fields,
  },
})
