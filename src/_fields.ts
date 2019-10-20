import { Request, RequestFields } from './_types'

/**
 * Adjust Request fields, by extending `fields`
 * @return new Request, doesn't modify original Request
 */
function fields<RequestEx extends Request>(fields: Partial<RequestFields>) {
  return (request: RequestEx): RequestEx => ({
    ...request,
    fields: {
      ...request.fields,
      ...fields,
    },
  })
}

export default fields
