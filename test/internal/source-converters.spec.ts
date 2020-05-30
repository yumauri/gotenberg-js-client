import { Readable } from 'stream'
import { basename } from 'path'
import { createReadStream, ReadStream } from 'fs'
import {
  DEFAULT_FILENAME,
  fromFile,
  toStream,
  toStreams,
  toTuples,
} from '../../src/internal/source-converters'

// tslint:disable no-any

test('Test `toTuples` function', () => {
  expect(() => toTuples(undefined as any)).toThrow()
  expect(toTuples(new URL('http://1'))).toEqual([])
  expect(toTuples('file://test.html')).toEqual([[DEFAULT_FILENAME, 'file://test.html']])
  expect(toTuples('file://test.doc')).toEqual([['test.doc', 'file://test.doc']])
  expect(toTuples('test')).toEqual([[DEFAULT_FILENAME, 'test']])

  const buffer = Buffer.from('test')
  expect(toTuples(buffer)).toEqual([[DEFAULT_FILENAME, buffer]])

  const stream = new Readable()
  expect(toTuples(stream)).toEqual([[DEFAULT_FILENAME, stream]])

  const file = createReadStream(__filename)
  expect(toTuples(file)).toEqual([[basename(__filename), file]])

  expect(toTuples(['index.html', 'test'])).toEqual([['index.html', 'test']])
  expect(toTuples({ 'index.html': 'test' })).toEqual([['index.html', 'test']])

  const map = new Map<string, any>()
  map.set('index.html', 'test')
  expect(toTuples(map)).toEqual([['index.html', 'test']])

  const set = new Set<any>()
  set.add(new Set<any>())
  expect(() => toTuples(set)).toThrow('Bad source, don\'t know what to do with "[object Set]"')
})

test('Test `toTuples` function, different edge cases', () => {
  // line 46
  const file = createReadStream(`${__dirname}/../manual/statement.html`)
  expect(toTuples(file)).toEqual([['index.html', file]])

  // line 66, `hasOwnProperty`
  function Src(this: any) {
    this['index.html'] = 'test'
  }
  Src.prototype['header.html'] = ''
  expect(toTuples(new Src())).toEqual([['index.html', 'test']])
})

test('Test `fromFile` function', () => {
  expect(fromFile('file:' + __filename) instanceof ReadStream).toBe(true)
  expect(fromFile('file://' + __filename) instanceof ReadStream).toBe(true)
})

test('Test `toStream` function', async () => {
  const stream0 = new Readable()
  expect(toStream(stream0)).toEqual(stream0)
  expect(toStream('file:' + __filename) instanceof ReadStream).toBe(true)
  expect(toStream('test') instanceof Readable).toBe(true)

  const chunks: any[] = []
  const stream = toStream('test')
  const result = await new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(chunk))
    stream.on('error', reject)
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
  })
  expect(result).toEqual('test')
})

test('Test `toStreams` function', () => {
  expect(toStreams()).toEqual([])

  const result1 = toStreams(Buffer.from('test'))
  expect(result1 instanceof Array).toBe(true)
  expect(result1[0] instanceof Array).toBe(true)
  expect(result1[0][0]).toEqual(DEFAULT_FILENAME)
  expect(result1[0][1] instanceof Readable).toBe(true)
})
