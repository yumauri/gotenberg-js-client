import { Request, RequestType } from './_types'
import ping from './ping'

// dumb object to test purity
const dumb = { type: RequestType.Undefined, url: 'test', fields: {} }

test('Should add `/ping` path and change type', () => {
  expect(ping(dumb as Request)).toEqual({
    ...dumb,
    type: RequestType.Ping,
    url: 'test/ping',
  })
})

test('Should not change original request', () => {
  expect(ping(dumb as Request)).toEqual({
    ...dumb,
    type: RequestType.Ping,
    url: 'test/ping',
  })
})

test('Should add property, if absent', () => {
  expect(ping({} as Request)).toEqual({ type: RequestType.Ping, url: '/ping' })
})
