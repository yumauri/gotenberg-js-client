import { HtmlRequest, RequestType } from './_types'
import to from './to'
import { a4, landscape, noMargins } from './to-helpers'
import { A4, NO_MARGINS } from './page'

// dumb object to test purity
const dumb: HtmlRequest = {
  type: RequestType.Html,
  url: 'test',
  fields: {},
  client: {
    post: () => {
      throw new Error('not implemented')
    },
  },
}

test('Should set static fields', () => {
  expect(to()(dumb)).toEqual({ ...dumb })
  expect(to({})(dumb)).toEqual({ ...dumb })
  expect(to({ landscape: true })(dumb)).toEqual({
    ...dumb,
    fields: { landscape: true },
  })
  expect(to({ landscape: true })(dumb)).toEqual({
    ...dumb,
    fields: { landscape: true },
  })
})

test('Should set fields using modifiers', () => {
  expect(to(a4)(dumb)).toEqual({
    ...dumb,
    fields: {
      paperWidth: A4[0],
      paperHeight: A4[1],
    },
  })
  expect(to(landscape)(dumb)).toEqual({
    ...dumb,
    fields: { landscape: true },
  })
})

test('Should set "my" static fields', () => {
  expect(to({ paper: A4 })(dumb)).toEqual({
    ...dumb,
    fields: {
      paperWidth: A4[0],
      paperHeight: A4[1],
    },
  })
  expect(to(A4)(dumb)).toEqual({
    ...dumb,
    fields: {
      paperWidth: A4[0],
      paperHeight: A4[1],
    },
  })
  expect(to({ width: A4[0] })(dumb)).toEqual({
    ...dumb,
    fields: {
      paperWidth: A4[0],
    },
  })
  expect(to({ margins: NO_MARGINS })(dumb)).toEqual({
    ...dumb,
    fields: {
      marginTop: NO_MARGINS[0],
      marginRight: NO_MARGINS[1],
      marginBottom: NO_MARGINS[2],
      marginLeft: NO_MARGINS[3],
    },
  })
  expect(to(NO_MARGINS)(dumb)).toEqual({
    ...dumb,
    fields: {
      marginTop: NO_MARGINS[0],
      marginRight: NO_MARGINS[1],
      marginBottom: NO_MARGINS[2],
      marginLeft: NO_MARGINS[3],
    },
  })
  expect(to({ top: 10, left: 20 })(dumb)).toEqual({
    ...dumb,
    fields: {
      marginTop: 10,
      marginLeft: 20,
    },
  })
})

test('Should set fields both, using modifiers and static', () => {
  expect(to(noMargins, { landscape: true })(dumb)).toEqual({
    ...dumb,
    fields: {
      marginTop: NO_MARGINS[0],
      marginRight: NO_MARGINS[1],
      marginBottom: NO_MARGINS[2],
      marginLeft: NO_MARGINS[3],
      landscape: true,
    },
  })
})
