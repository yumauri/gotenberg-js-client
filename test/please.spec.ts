import FormData from 'form-data'
import { createReadStream } from 'fs'
import { HtmlRequest, MarkdownRequest, OfficeRequest, PingRequest, RequestType } from '../src'
import { please } from '../src/please'

test('Should make client POST call with request', async () => {
  const get = jest.fn()
  const post = jest.fn()
  const request: HtmlRequest = {
    type: RequestType.Html,
    client: { get, post },
    url: 'http://120.0.0.1:3000/convert/html',
    source: 'test',
    fields: {},
  }

  await please(request)

  expect(post.mock.calls.length).toBe(1)
  expect(post.mock.calls[0][0]).toEqual('http://120.0.0.1:3000/convert/html')
  expect(post.mock.calls[0][1]).toEqual(expect.any(FormData))
})

test('Should make client GET call with ping request', async () => {
  const get = jest.fn()
  const post = jest.fn()
  const request: PingRequest = {
    type: RequestType.Ping,
    client: {
      get: async (url) => {
        get(url)
        return createReadStream(__filename)
      },
      post,
    },
    url: 'http://120.0.0.1:3000/ping',
    fields: {},
  }

  await please(request)

  expect(get.mock.calls.length).toBe(1)
  expect(get.mock.calls[0][0]).toEqual('http://120.0.0.1:3000/ping')
})

test('Should throw on ping request if there is no get method', () => {
  const post = jest.fn()
  const request: PingRequest = {
    type: RequestType.Ping,
    client: { post },
    url: 'http://120.0.0.1:3000/ping',
    fields: {},
  }

  expect(() => please(request)).toThrow(`Gotenberg client doesn't implements "get" method`)
})

test('Should make client POST call with request', async () => {
  const get = jest.fn()
  const post = jest.fn()

  const fields = Object.create({ test: 'test' }) // this is to test 'hasOwnProperty'
  fields.landscape = true
  fields.resultFilename = 'index.pdf'
  fields.waitDelay = undefined

  const request: HtmlRequest = {
    type: RequestType.Html,
    client: { get, post },
    url: 'http://120.0.0.1:3000/convert/html',
    source: 'test',
    fields,
    headers: { 'Gotenberg-Remoteurl-Test': 'Foo' },
  }

  await please(request)

  expect(post.mock.calls.length).toBe(1)
  expect(post.mock.calls[0][0]).toEqual('http://120.0.0.1:3000/convert/html')
  expect(post.mock.calls[0][1]).toEqual(expect.any(FormData))
  expect(post.mock.calls[0][2]).toEqual({ 'Gotenberg-Remoteurl-Test': 'Foo' })
})

test('Should throw on duplicates', () => {
  const request: HtmlRequest = {
    type: RequestType.Html,
    source: [
      ['index.html', 'test'],
      ['index.html', 'test'],
    ],
  } as any

  expect(() => please(request)).toThrow(`There are duplicates in file names: index.html`)
})

test('Should throw on wrong source filenames', () => {
  const request1: HtmlRequest = {
    type: RequestType.Html,
    source: { 'test.doc': 'test' },
  } as any

  expect(() => please(request1)).toThrow(`File "index.html" is required for HTML conversion`)

  const request2: MarkdownRequest = {
    type: RequestType.Markdown,
    source: { 'test.doc': 'test' },
  } as any

  expect(() => please(request2)).toThrow(`File "index.html" is required for Markdown conversion`)

  const request3: OfficeRequest = {
    type: RequestType.Office,
    source: { 'index.html': 'test' },
  } as any

  expect(() => please(request3)).toThrow(
    `Default filename "index.html" is not allowed for Office conversion, ` +
      `looks like you didn't set filename for document`
  )
})

test('Should throw on wrong source filename 2', () => {
  const request1: OfficeRequest = {
    type: RequestType.Office,
    source: ['aaaaa', 'test'],
  } as any

  expect(() => please(request1)).toThrow(`Source name "aaaaa" doesn't look like file name`)

  const request2: OfficeRequest = {
    type: RequestType.Office,
    source: { aaaaa: 'test' },
  } as any

  expect(() => please(request2)).toThrow(`Source name "aaaaa" doesn't look like file name`)

  const request3: OfficeRequest = {
    type: RequestType.Office,
    source: [['aaaaa', 'test']],
  } as any

  expect(() => please(request3)).toThrow(`Source name "aaaaa" doesn't look like file name`)

  const request4: OfficeRequest = {
    type: RequestType.Office,
    source: [{ aaaaa: 'test' }],
  } as any

  expect(() => please(request4)).toThrow(`Source name "aaaaa" doesn't look like file name`)

  const request5: OfficeRequest = {
    type: RequestType.Office,
    source: [['aaaaa', 'test'], { aaaaa: 'test' }],
  } as any

  expect(() => please(request5)).toThrow(`Source name "aaaaa" doesn't look like file name`)
})
