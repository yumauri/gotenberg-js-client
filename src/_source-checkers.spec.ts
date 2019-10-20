import { Readable } from 'stream'
import {
  isBuffer,
  isFileName,
  isFileUri,
  isIterable,
  isObject,
  isPlain,
  isStream,
  isString,
  isTuple,
  isURL,
} from './_source-checkers'

// tslint:disable no-any

// test dumb sources
const string = 'test' // tslint:disable-line variable-name
const url = new URL('http://1')
const array = []
const map = new Map<string, string>()
const set = new Set<string>()
const object = {}
const buffer = Buffer.from('test')
const generator = function* gen() {} // tslint:disable-line no-empty
const iterator = { [Symbol.iterator]: generator }

test('Test `isBuffer` function', function() {
  expect(isBuffer(undefined)).toBe(false)
  expect(isBuffer(null)).toBe(false)
  expect(isBuffer(string)).toBe(false)
  expect(isBuffer(url)).toBe(false)
  expect(isBuffer(array)).toBe(false)
  expect(isBuffer(map)).toBe(false)
  expect(isBuffer(set)).toBe(false)
  expect(isBuffer(arguments)).toBe(false)
  expect(isBuffer(object)).toBe(false)
  expect(isBuffer(buffer)).toBe(true) // <-
  expect(isBuffer(generator())).toBe(false)
  expect(isBuffer(iterator)).toBe(false)
})

test('Test `isFileName` function', function() {
  expect(isFileName(undefined)).toBe(false)
  expect(isFileName(null)).toBe(false)
  expect(isFileName(string)).toBe(false)
  expect(isFileName('index.html')).toBe(true) // <-
  expect(isFileName('test.md')).toBe(true) // <-
  expect(isFileName('image.gif')).toBe(true) // <-
  expect(isFileName(url)).toBe(false)
  expect(isFileName(array)).toBe(false)
  expect(isFileName(map)).toBe(false)
  expect(isFileName(set)).toBe(false)
  expect(isFileName(arguments)).toBe(false)
  expect(isFileName(object)).toBe(false)
  expect(isFileName(buffer)).toBe(false)
  expect(isFileName(generator())).toBe(false)
  expect(isFileName(iterator)).toBe(false)
})

test('Test `isFileUri` function', function() {
  expect(isFileUri(undefined)).toBe(false)
  expect(isFileUri(null)).toBe(false)
  expect(isFileUri(string)).toBe(false)
  expect(isFileUri('file://test')).toBe(true) // <-
  expect(isFileUri('file:test')).toBe(true) // <-
  expect(isFileUri(url)).toBe(false)
  expect(isFileUri(array)).toBe(false)
  expect(isFileUri(map)).toBe(false)
  expect(isFileUri(set)).toBe(false)
  expect(isFileUri(arguments)).toBe(false)
  expect(isFileUri(object)).toBe(false)
  expect(isFileUri(buffer)).toBe(false)
  expect(isFileUri(generator())).toBe(false)
  expect(isFileUri(iterator)).toBe(false)
})

test('Test `isIterable` function', function() {
  expect(isIterable(undefined)).toBe(false)
  expect(isIterable(null)).toBe(false)
  expect(isIterable(string)).toBe(false)
  expect(isIterable(url)).toBe(false)
  expect(isIterable(array)).toBe(true) // <-
  expect(isIterable(map)).toBe(true) // <-
  expect(isIterable(set)).toBe(true) // <-
  expect(isIterable(arguments)).toBe(true) // <-
  expect(isIterable(object)).toBe(false)
  expect(isIterable(buffer)).toBe(false)
  expect(isIterable(generator())).toBe(true) // <-
  expect(isIterable(iterator)).toBe(true) // <-

  // iterable should contain plain source
  expect(isIterable([undefined as any])).toBe(false)
  expect(isIterable([null as any])).toBe(false)
  expect(isIterable([string])).toBe(true) // <-
  expect(isIterable([url as any])).toBe(false)
  expect(isIterable([array as any])).toBe(false)
  expect(isIterable([map as any])).toBe(false)
  expect(isIterable([set as any])).toBe(false)
  expect(isIterable([arguments as any])).toBe(false)
  expect(isIterable([object])).toBe(true) // <-
  expect(isIterable([buffer])).toBe(true) // <-
  expect(isIterable([generator() as any])).toBe(false)
  expect(isIterable([iterator as any])).toBe(false)
})

test('Test `isObject` function', function() {
  expect(isObject(undefined)).toBe(false)
  expect(isObject(null)).toBe(false)
  expect(isObject(string)).toBe(false)
  expect(isObject(url)).toBe(false)
  expect(isObject(array)).toBe(false)
  expect(isObject(map)).toBe(false)
  expect(isObject(set)).toBe(false)
  expect(isObject(arguments)).toBe(false)
  expect(isObject(object)).toBe(true) // <-
  expect(isObject(buffer)).toBe(false)
  expect(isObject(generator())).toBe(false)
  expect(isObject(iterator)).toBe(false)

  // object should contain plain source
  expect(isObject({ test: undefined as any })).toBe(false)
  expect(isObject({ test: null as any })).toBe(false)
  expect(isObject({ test: string })).toBe(true) // <-
  expect(isObject({ test: url as any })).toBe(false)
  expect(isObject({ test: array as any })).toBe(false)
  expect(isObject({ test: map as any })).toBe(false)
  expect(isObject({ test: set as any })).toBe(false)
  expect(isObject({ test: arguments as any })).toBe(false)
  expect(isObject({ test: object as any })).toBe(false)
  expect(isObject({ test: buffer })).toBe(true) // <-
  expect(isObject({ test: generator() as any })).toBe(false)
  expect(isObject({ test: iterator as any })).toBe(false)
})

test('Test `isPlain` function', function() {
  expect(isPlain(undefined)).toBe(false)
  expect(isPlain(null)).toBe(false)
  expect(isPlain(string)).toBe(true) // <-
  expect(isPlain(url)).toBe(false) // do not consider URL as plain
  expect(isPlain(array)).toBe(false)
  expect(isPlain(map)).toBe(false)
  expect(isPlain(set)).toBe(false)
  expect(isPlain(arguments)).toBe(false)
  expect(isPlain(object)).toBe(false)
  expect(isPlain(buffer)).toBe(true) // <-
  expect(isPlain(generator())).toBe(false)
  expect(isPlain(iterator)).toBe(false)
})

test('Test `isStream` function', function() {
  expect(isStream(undefined)).toBe(false)
  expect(isStream(null)).toBe(false)
  expect(isStream(string)).toBe(false)
  expect(isStream(url)).toBe(false)
  expect(isStream(array)).toBe(false)
  expect(isStream(map)).toBe(false)
  expect(isStream(set)).toBe(false)
  expect(isStream(arguments)).toBe(false)
  expect(isStream(object)).toBe(false)
  expect(isStream(buffer)).toBe(false)
  expect(isStream(generator())).toBe(false)
  expect(isStream(iterator)).toBe(false)
  expect(isStream(new Readable())).toBe(true) // <-
})

test('Test `isString` function', function() {
  expect(isString(undefined)).toBe(false)
  expect(isString(null)).toBe(false)
  expect(isString(string)).toBe(true) // <-
  expect(isString(url)).toBe(false)
  expect(isString(array)).toBe(false)
  expect(isString(map)).toBe(false)
  expect(isString(set)).toBe(false)
  expect(isString(arguments)).toBe(false)
  expect(isString(object)).toBe(false)
  expect(isString(buffer)).toBe(false)
  expect(isString(generator())).toBe(false)
  expect(isString(iterator)).toBe(false)
})

test('Test `isTuple` function', function() {
  expect(isTuple(undefined)).toBe(false)
  expect(isTuple(null)).toBe(false)
  expect(isTuple(string as any)).toBe(false)
  expect(isTuple(url)).toBe(false)
  expect(isTuple(array)).toBe(false)
  expect(isTuple(map)).toBe(false)
  expect(isTuple(set)).toBe(false)
  expect(isTuple(arguments)).toBe(false)
  expect(isTuple(object)).toBe(false)
  expect(isTuple(buffer)).toBe(false)
  expect(isTuple(generator())).toBe(false)
  expect(isTuple(iterator)).toBe(false)

  // first element of tuple should be string
  expect(isTuple([undefined, 'test'])).toBe(false)
  expect(isTuple([null, 'test'])).toBe(false)
  expect(isTuple([string, 'test'])).toBe(true) // <-
  expect(isTuple([url, 'test'])).toBe(false)
  expect(isTuple([array, 'test'])).toBe(false)
  expect(isTuple([map, 'test'])).toBe(false)
  expect(isTuple([set, 'test'])).toBe(false)
  expect(isTuple([arguments, 'test'])).toBe(false)
  expect(isTuple([object, 'test'])).toBe(false)
  expect(isTuple([buffer, 'test'])).toBe(false)
  expect(isTuple([generator(), 'test'])).toBe(false)
  expect(isTuple([iterator, 'test'])).toBe(false)

  // second element of tuple should be plain source
  expect(isTuple(['test', undefined])).toBe(false)
  expect(isTuple(['test', null])).toBe(false)
  expect(isTuple(['test', string])).toBe(true) // <-
  expect(isTuple(['test', url])).toBe(false)
  expect(isTuple(['test', array])).toBe(false)
  expect(isTuple(['test', map])).toBe(false)
  expect(isTuple(['test', set])).toBe(false)
  expect(isTuple(['test', arguments])).toBe(false)
  expect(isTuple(['test', object])).toBe(false)
  expect(isTuple(['test', buffer])).toBe(true) // <-
  expect(isTuple(['test', generator()])).toBe(false)
  expect(isTuple(['test', iterator])).toBe(false)
})

test('Test `isURL` function', function() {
  expect(isURL(undefined)).toBe(false)
  expect(isURL(null)).toBe(false)
  expect(isURL(string)).toBe(false)
  expect(isURL(url)).toBe(true) // <-
  expect(isURL(array)).toBe(false)
  expect(isURL(map)).toBe(false)
  expect(isURL(set)).toBe(false)
  expect(isURL(arguments)).toBe(false)
  expect(isURL(object)).toBe(false)
  expect(isURL(buffer)).toBe(false)
  expect(isURL(generator())).toBe(false)
  expect(isURL(iterator)).toBe(false)
})
