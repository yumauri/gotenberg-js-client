import { adjust, Request, RequestType } from '../src'

// dumb object to test purity
const dumb: Request = {
  type: RequestType.Undefined,
  url: 'test',
  fields: {
    scale: 1,
    landscape: true,
    pageRanges: '1-2',
  },
  client: {
    post: () => {
      throw new Error('not implemented')
    },
  },
}

test('Should adjust flat fields', () => {
  expect(adjust({})(dumb)).toEqual({ ...dumb })
  expect(adjust({ url: 'changed' })(dumb)).toEqual({ ...dumb, url: 'changed' })
})

test('Should adjust deep fields', () => {
  expect(adjust({ fields: { landscape: false } })(dumb)).toEqual({
    ...dumb,
    fields: {
      ...dumb.fields,
      landscape: false,
    },
  })
  expect(adjust({ headers: { Authorization: 'Bearer token' } })(dumb)).toEqual({
    ...dumb,
    headers: {
      Authorization: 'Bearer token',
    },
  })
  expect(
    adjust({ headers: { Authorization: 'Bearer token' } })({
      ...dumb,
      headers: { 'X-Header': 'test' },
    })
  ).toEqual({
    ...dumb,
    headers: {
      Authorization: 'Bearer token',
      'X-Header': 'test',
    },
  })
})

test('Should replace deep fields', () => {
  expect(
    adjust({ headers: { Authorization: 'Bearer token' } })({
      ...dumb,
      headers: { Authorization: 'Basic dXNlcjpwYXNzd29yZA==' },
    })
  ).toEqual({ ...dumb, headers: { Authorization: 'Bearer token' } })
})
