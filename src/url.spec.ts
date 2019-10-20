import { Request, RequestType } from './_types'
import url from './url'

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

test('Should accept string and URL as source', () => {
  expect(() => url({ ...dumb, source: 'http://1' })).not.toThrow()
  expect(() => url({ ...dumb, source: new URL('http://1') })).not.toThrow()
})

test('Should fail on any other source', function() {
  expect(() => url(dumb)).toThrow()
  expect(() => url({ ...dumb, source: [] })).toThrow()
  expect(() => url({ ...dumb, source: new Map() })).toThrow()
  expect(() => url({ ...dumb, source: new Set() })).toThrow()
  expect(() => url({ ...dumb, source: arguments })).toThrow()
  expect(() => url({ ...dumb, source: {} })).toThrow()
  expect(() => url({ ...dumb, source: Buffer.from('test') })).toThrow()

  function* generator() {} // tslint:disable-line no-empty
  const iterator = { [Symbol.iterator]: generator }
  expect(() => url({ ...dumb, source: iterator })).toThrow()
  expect(() => url({ ...dumb, source: generator() })).toThrow()
})

test('Should add `/url` path, change type, remove source and set zero margins', () => {
  expect(url({ ...dumb, source: 'http://1' })).toEqual({
    ...dumb,
    type: RequestType.Url,
    url: 'test/url',
    source: undefined,
    fields: {
      remoteURL: 'http://1',
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
    },
  })
})
