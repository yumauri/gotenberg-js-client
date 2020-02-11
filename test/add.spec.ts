import { add, headers, Request, RequestType } from '../src'

// dumb object to test purity
const dumb: Request = {
  type: RequestType.Undefined,
  url: 'test',
  fields: {},
  client: {
    post: () => {
      throw new Error('not implemented')
    },
  },
}

test('Should set fields using modifiers', () => {
  expect(add(headers({ Test: 'Foo' }))(dumb)).toEqual({
    ...dumb,
    headers: { 'Gotenberg-Remoteurl-Test': 'Foo' },
  })
})
