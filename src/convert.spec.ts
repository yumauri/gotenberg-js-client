import { Request } from './_types'
import convert from './convert'

// dumb object to test purity
const dumb = { url: 'test', fields: {} }

test('Should add `/convert` path', () => {
  expect(convert(dumb as Request)).toEqual({ ...dumb, url: 'test/convert' })
})

test('Should not change original request', () => {
  expect(convert(dumb as Request)).toEqual({ ...dumb, url: 'test/convert' })
})

test('Should add property, if absent', () => {
  expect(convert({} as Request)).toEqual({ url: '/convert' })
})
