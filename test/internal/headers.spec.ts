import { Request } from '../../src'
import { headers } from '../../src/internal/headers'

// dumb object to test purity
const dumb = { url: 'test', headers: { Test: 'Test' } }

test('Should add headers', () => {
  const fn = headers({ 'X-Test-Header': 'Foo' })
  expect(typeof fn).toBe('function')
  // tslint:disable-next-line no-any
  expect(fn(dumb as any)).toEqual({
    ...dumb,
    headers: { Test: 'Test', 'X-Test-Header': 'Foo' },
  })
})

test('Should not change original request', () => {
  const fn = headers({ 'X-Test-Header': 'Bar' })
  expect(typeof fn).toBe('function')
  // tslint:disable-next-line no-any
  expect(fn(dumb as any)).toEqual({
    ...dumb,
    headers: { Test: 'Test', 'X-Test-Header': 'Bar' },
  })
})

test('Should add property, if absent', () => {
  const fn = headers({ 'X-Test-Header': 'Baz' })
  expect(typeof fn).toBe('function')
  expect(fn({} as Request)).toEqual({
    headers: { 'X-Test-Header': 'Baz' },
  })
})
