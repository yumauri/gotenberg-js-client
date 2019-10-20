import { Request, RequestType } from './_types'
import merge from './merge'

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

test('Should accept iterable as source', function() {
  expect(() => merge({ ...dumb, source: [] })).not.toThrow()
  expect(() => merge({ ...dumb, source: new Map() })).not.toThrow()
  expect(() => merge({ ...dumb, source: new Set() })).not.toThrow()
  expect(() => merge({ ...dumb, source: arguments })).not.toThrow()

  function* generator() {} // tslint:disable-line no-empty
  const iterator = { [Symbol.iterator]: generator }
  expect(() => merge({ ...dumb, source: iterator })).not.toThrow()
  expect(() => merge({ ...dumb, source: generator() })).not.toThrow()
})

test('Should accept object as source', () => {
  expect(() => merge({ ...dumb, source: {} })).not.toThrow()
})

test('Should fail on string, URL and Buffer', () => {
  expect(() => merge(dumb)).toThrow()
  expect(() => merge({ ...dumb, source: 'test' })).toThrow()
  expect(() => merge({ ...dumb, source: new URL('http://1') })).toThrow()
  expect(() => merge({ ...dumb, source: Buffer.from('test') })).toThrow()
})

test('Should add `/merge` path and change type', () => {
  expect(merge({ ...dumb, source: [] })).toEqual({
    ...dumb,
    source: [],
    type: RequestType.Merge,
    url: 'test/merge',
  })
})
