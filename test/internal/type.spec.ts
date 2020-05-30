import { Request, RequestType } from '../../src'
import { type } from '../../src/internal/type'

// dumb object to test purity
const dumb = { type: RequestType.Undefined, url: 'test' }

test('Should change type to Url', () => {
  const fn = type(RequestType.Url)
  expect(typeof fn).toBe('function')
  expect(fn(dumb as Request)).toEqual({
    ...dumb,
    type: RequestType.Url,
  })
})

test('Should change type to Ping', () => {
  const fn = type(RequestType.Ping)
  expect(typeof fn).toBe('function')
  expect(fn(dumb as Request)).toEqual({
    ...dumb,
    type: RequestType.Ping,
  })
})

test('Should change type to Html', () => {
  const fn = type(RequestType.Html)
  expect(typeof fn).toBe('function')
  expect(fn(dumb as Request)).toEqual({
    ...dumb,
    type: RequestType.Html,
  })
})

test('Should change type to Merge', () => {
  const fn = type(RequestType.Merge)
  expect(typeof fn).toBe('function')
  expect(fn(dumb as Request)).toEqual({
    ...dumb,
    type: RequestType.Merge,
  })
})

test('Should change type to Office', () => {
  const fn = type(RequestType.Office)
  expect(typeof fn).toBe('function')
  expect(fn(dumb as Request)).toEqual({
    ...dumb,
    type: RequestType.Office,
  })
})

test('Should change type to Markdown', () => {
  const fn = type(RequestType.Markdown)
  expect(typeof fn).toBe('function')
  expect(fn(dumb as Request)).toEqual({
    ...dumb,
    type: RequestType.Markdown,
  })
})

test('Should throw on double conversion', () => {
  const request = { type: RequestType.Url } as Request
  const fn = type(RequestType.Office)
  expect(() => fn(request)).toThrow(`Cannot set "Office" conversion, already set to "Url"`)
})
