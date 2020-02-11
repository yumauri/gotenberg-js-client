import { header, headers, webhookHeader, webhookHeaders } from '../src'

test('Test `header` function', () => {
  const object = {}
  header('Test', 'Foo')(object)
  expect(object).toEqual({ 'Gotenberg-Remoteurl-Test': 'Foo' })
})

test('Test `headers` function', () => {
  const object = {}
  headers({ Test1: 'Foo', Test2: 'Bar' })(object)
  expect(object).toEqual({
    'Gotenberg-Remoteurl-Test1': 'Foo',
    'Gotenberg-Remoteurl-Test2': 'Bar',
  })
})

test('Test `webhookHeader` function', () => {
  const object = {}
  webhookHeader('Test', 'Foo')(object)
  expect(object).toEqual({ 'Gotenberg-Webhookurl-Test': 'Foo' })
})

test('Test `webjookHeaders` function', () => {
  const object = {}
  webhookHeaders({ Test1: 'Foo', Test2: 'Bar' })(object)
  expect(object).toEqual({
    'Gotenberg-Webhookurl-Test1': 'Foo',
    'Gotenberg-Webhookurl-Test2': 'Bar',
  })
})
