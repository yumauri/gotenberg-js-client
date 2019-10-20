import { Request, RequestType } from './_types'
import set from './set'
import { delay, filename } from './set-helpers'

// dumb object to test purity
const dumb: Request = {
  type: RequestType.Undefined,
  url: 'test',
  fields: {},
  client: {
    post: () => {
      throw new Error('not implemented')
    },
  },
}

test('Should set static fields', () => {
  expect(set()(dumb)).toEqual({ ...dumb })
  expect(set({})(dumb)).toEqual({ ...dumb })
  expect(set({ landscape: true })(dumb)).toEqual({
    ...dumb,
    fields: { landscape: true },
  })
  expect(set({ resultFilename: 'index.pdf' })(dumb)).toEqual({
    ...dumb,
    fields: { resultFilename: 'index.pdf' },
  })
})

test('Should set fields using modifiers', () => {
  expect(set(delay(99))(dumb)).toEqual({
    ...dumb,
    fields: { waitDelay: 99 },
  })
  expect(set(filename('index.pdf'))(dumb)).toEqual({
    ...dumb,
    fields: { resultFilename: 'index.pdf' },
  })
})

test('Should set fields both, using modifiers and static', () => {
  expect(set(delay(99), { resultFilename: 'test.pdf' })(dumb)).toEqual({
    ...dumb,
    fields: { waitDelay: 99, resultFilename: 'test.pdf' },
  })
})
