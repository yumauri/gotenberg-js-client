import { Request } from './_types'
import path from './_path'

// dumb object to test purity
const dumb = { url: 'test', fields: {} }

test('Should add `/path` path', () => {
  const fn = path('/test')
  expect(typeof fn).toBe('function')
  expect(fn(dumb as Request)).toEqual({ ...dumb, url: 'test/test' })
})

test('Should not change original request', () => {
  const fn = path('/world')
  expect(typeof fn).toBe('function')
  expect(fn(dumb as Request)).toEqual({ ...dumb, url: 'test/world' })
})

test('Should add property, if absent', () => {
  const fn = path('hello')
  expect(typeof fn).toBe('function')
  expect(fn({} as Request)).toEqual({ url: 'hello' })
})
