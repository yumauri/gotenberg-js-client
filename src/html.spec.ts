import { Request, RequestType } from './_types'
import html from './html'

// dumb object to test purity
const dumb = { type: RequestType.Undefined, url: 'test', fields: {} }

test('Should add `/html` path and change type', () => {
  expect(html(dumb as Request)).toEqual({
    ...dumb,
    type: RequestType.Html,
    url: 'test/html',
  })
})

test('Should not change original request', () => {
  expect(html(dumb as Request)).toEqual({
    ...dumb,
    type: RequestType.Html,
    url: 'test/html',
  })
})

test('Should return Request modifier, if options are given', () => {
  expect(html({ waitDelay: 10 })(dumb as Request)).toEqual({
    ...dumb,
    type: RequestType.Html,
    url: 'test/html',
    fields: {
      waitDelay: 10,
    },
  })
})
