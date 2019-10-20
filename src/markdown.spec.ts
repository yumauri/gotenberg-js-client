import { Request, RequestType } from './_types'
import markdown from './markdown'

// dumb object to test purity
const dumb = { type: RequestType.Undefined, url: 'test', fields: {} }

test('Should add `/markdown` path and change type', () => {
  expect(markdown(dumb as Request)).toEqual({
    ...dumb,
    type: RequestType.Markdown,
    url: 'test/markdown',
  })
})

test('Should not change original request', () => {
  expect(markdown(dumb as Request)).toEqual({
    ...dumb,
    type: RequestType.Markdown,
    url: 'test/markdown',
  })
})

test('Should return Request modifier, if options are given', () => {
  expect(markdown({ waitDelay: 10 })(dumb as Request)).toEqual({
    ...dumb,
    type: RequestType.Markdown,
    url: 'test/markdown',
    fields: {
      waitDelay: 10,
    },
  })
})
