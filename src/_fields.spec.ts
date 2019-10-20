import { Request } from './_types'
import fields from './_fields'

// dumb object to test purity
const dumb = { url: 'test', fields: { landscape: false } }

test('Should add fields', () => {
  const fn = fields({ waitTimeout: 10 })
  expect(typeof fn).toBe('function')
  expect(fn(dumb as Request)).toEqual({
    ...dumb,
    fields: {
      landscape: false,
      waitTimeout: 10,
    },
  })
})

test('Should not change original request', () => {
  const fn = fields({ webhookURL: 'test string' })
  expect(typeof fn).toBe('function')
  expect(fn(dumb as Request)).toEqual({
    ...dumb,
    fields: {
      landscape: false,
      webhookURL: 'test string',
    },
  })
})

test('Should add property, if absent', () => {
  const fn = fields({ resultFilename: 'test string' })
  expect(typeof fn).toBe('function')
  expect(fn({} as Request)).toEqual({
    fields: {
      resultFilename: 'test string',
    },
  })
})
