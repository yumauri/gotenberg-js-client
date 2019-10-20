import {
  a3,
  a4,
  a5,
  a6,
  landscape,
  largeMargins,
  legal,
  letter,
  marginSizes,
  noMargins,
  normalMargins,
  paperSize,
  portrait,
  tabloid,
} from './to-helpers'
import {
  A3,
  A4,
  A5,
  A6,
  LARGE_MARGINS,
  LEGAL,
  LETTER,
  NO_MARGINS,
  NORMAL_MARGINS,
  TABLOID,
} from './page'

test('Test `landscape` function', () => {
  const object = {}
  landscape(object)
  expect(object).toEqual({ landscape: true })
})

test('Test `portrait` function', () => {
  const object = { landscape: true }
  portrait(object)
  expect(object).toEqual({ landscape: undefined })
})

test('Test `a3` function', () => {
  const object = {}
  a3(object)
  expect(object).toEqual({ paperWidth: A3[0], paperHeight: A3[1] })
})

test('Test `a4` function', () => {
  const object = {}
  a4(object)
  expect(object).toEqual({ paperWidth: A4[0], paperHeight: A4[1] })
})

test('Test `a5` function', () => {
  const object = {}
  a5(object)
  expect(object).toEqual({ paperWidth: A5[0], paperHeight: A5[1] })
})

test('Test `a6` function', () => {
  const object = {}
  a6(object)
  expect(object).toEqual({ paperWidth: A6[0], paperHeight: A6[1] })
})

test('Test `legal` function', () => {
  const object = {}
  legal(object)
  expect(object).toEqual({ paperWidth: LEGAL[0], paperHeight: LEGAL[1] })
})

test('Test `letter` function', () => {
  const object = {}
  letter(object)
  expect(object).toEqual({ paperWidth: LETTER[0], paperHeight: LETTER[1] })
})

test('Test `tabloid` function', () => {
  const object = {}
  tabloid(object)
  expect(object).toEqual({ paperWidth: TABLOID[0], paperHeight: TABLOID[1] })
})

test('Test `paperSize` function', () => {
  let object = {}
  paperSize([1, 2])(object)
  expect(object).toEqual({ paperWidth: 1, paperHeight: 2 })
  paperSize({ width: 5, height: 6 })(object)
  expect(object).toEqual({ paperWidth: 5, paperHeight: 6 })
  paperSize({ width: 10 })(object)
  expect(object).toEqual({ paperWidth: 10 })
  paperSize({ height: 15 })(object)
  expect(object).toEqual({ paperHeight: 15 })

  object = {}
  paperSize()(object)
  expect(object).toEqual(object)
})

test('Test `noMargins` function', () => {
  const object = {}
  noMargins(object)
  expect(object).toEqual({
    marginTop: NO_MARGINS[0],
    marginRight: NO_MARGINS[1],
    marginBottom: NO_MARGINS[2],
    marginLeft: NO_MARGINS[3],
  })
})

test('Test `normalMargins` function', () => {
  const object = {}
  normalMargins(object)
  expect(object).toEqual({
    marginTop: NORMAL_MARGINS[0],
    marginRight: NORMAL_MARGINS[1],
    marginBottom: NORMAL_MARGINS[2],
    marginLeft: NORMAL_MARGINS[3],
  })
})

test('Test `largeMargins` function', () => {
  const object = {}
  largeMargins(object)
  expect(object).toEqual({
    marginTop: LARGE_MARGINS[0],
    marginRight: LARGE_MARGINS[1],
    marginBottom: LARGE_MARGINS[2],
    marginLeft: LARGE_MARGINS[3],
  })
})

test('Test `marginSizes` function', () => {
  let object = {}
  marginSizes([1, 2, 3, 4])(object)
  expect(object).toEqual({
    marginTop: 1,
    marginRight: 2,
    marginBottom: 3,
    marginLeft: 4,
  })
  marginSizes({ top: 5, left: 6 })(object)
  expect(object).toEqual({
    marginTop: 5,
    marginLeft: 6,
  })
  marginSizes({ top: 10, right: 20, bottom: 15, left: 30 })(object)
  expect(object).toEqual({
    marginTop: 10,
    marginRight: 20,
    marginBottom: 15,
    marginLeft: 30,
  })
  marginSizes({ bottom: 15 })(object)
  expect(object).toEqual({
    marginBottom: 15,
  })

  object = {}
  marginSizes()(object)
  expect(object).toEqual(object)
})
