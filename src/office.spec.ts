import { Request, RequestType } from './_types'
import office from './office'

// dumb object to test purity
const dumb = { type: RequestType.Undefined, url: 'test', fields: {} }

test('Should add `/office` path and change type', () => {
  expect(office(dumb as Request)).toEqual({
    ...dumb,
    type: RequestType.Office,
    url: 'test/office',
  })
})

test('Should not change original request', () => {
  expect(office(dumb as Request)).toEqual({
    ...dumb,
    type: RequestType.Office,
    url: 'test/office',
  })
})

test('Should add property, if absent', () => {
  expect(office({} as Request)).toEqual({
    type: RequestType.Office,
    url: '/office',
  })
})
