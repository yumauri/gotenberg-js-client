import { RequestType } from '../src'
import { gotenberg } from '../src/gotenberg'

test('Test `gotenberg` function without client', () => {
  const fn = gotenberg('http://120.0.0.1:3000')
  expect(typeof fn).toBe('function')
  expect(fn('test')).toMatchObject({
    type: RequestType.Undefined,
    url: 'http://120.0.0.1:3000',
    source: 'test',
    fields: {},
  })
})

test('Test `gotenberg` function with custom client', () => {
  const client = {
    get() {}, // tslint:disable-line: no-empty
    post() {}, // tslint:disable-line: no-empty
  }
  const fn = gotenberg('http://120.0.0.1:3000', client)
  expect(typeof fn).toBe('function')
  expect(fn('test')).toEqual({
    type: RequestType.Undefined,
    client,
    url: 'http://120.0.0.1:3000',
    source: 'test',
    fields: {},
  })
})

test('Test `gotenberg` function with custom functional client', () => {
  const mock = jest.fn()
  const clientImpl = {
    get() {}, // tslint:disable-line: no-empty
    post() {}, // tslint:disable-line: no-empty
  }
  const client = function (arg: any) {
    mock(arg)
    return clientImpl
  }
  const fn = gotenberg('http://120.0.0.1:3000', client, { base: 'test' })
  expect(typeof fn).toBe('function')
  expect(fn('test')).toEqual({
    type: RequestType.Undefined,
    client: clientImpl,
    url: 'http://120.0.0.1:3000',
    source: 'test',
    fields: {},
  })
  expect(mock.mock.calls.length).toBe(1)
  expect(mock.mock.calls[0][0]).toEqual({ base: 'test' })
})

test('Test `gotenberg` function with custom class client', () => {
  const mock = jest.fn()
  class Client {
    constructor(arg: any) {
      mock(arg)
    }
    get() {} // tslint:disable-line: no-empty
    post() {} // tslint:disable-line: no-empty
  }
  const fn = gotenberg('http://120.0.0.1:3000', Client, { base: 'test' })
  expect(typeof fn).toBe('function')
  expect(fn('test')).toEqual({
    type: RequestType.Undefined,
    client: expect.any(Client),
    url: 'http://120.0.0.1:3000',
    source: 'test',
    fields: {},
  })
  expect(mock.mock.calls.length).toBe(1)
  expect(mock.mock.calls[0][0]).toEqual({ base: 'test' })
})
