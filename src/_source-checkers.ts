import { Readable } from 'stream'
import {
  FileURI,
  ObjectSource,
  PlainSource,
  Source,
  TupleSource,
} from './_types'

/**
 * Check if argument is String
 */
export const isString = (x: Source | undefined | null): x is string =>
  typeof x === 'string'

/**
 * Check if argument is Buffer
 */
export const isBuffer = (x: Source | undefined | null): x is Buffer =>
  x != null && x instanceof Buffer

/**
 * Check if argument is Stream
 */
export const isStream = (
  x: Source | undefined | null
): x is NodeJS.ReadableStream => x != null && x instanceof Readable

/**
 * Check if argument is URL
 */
export const isURL = (x: Source | undefined | null): x is URL =>
  x != null && x instanceof URL

/**
 * Check if argument is uri to local file
 * https://en.wikipedia.org/wiki/File_URI_scheme
 */
export const isFileUri = (x: Source | undefined | null): x is FileURI =>
  isString(x) && x.startsWith('file:')

/**
 * Check if argument is PlainSource - either String, Stream or Buffer
 */
export const isPlain = (x: Source | undefined | null): x is PlainSource =>
  isString(x) || isStream(x) || isBuffer(x) // || isFileUri(x) <- redundant check

/**
 * Check if argument is TupleSource - two-values array, like [key, PlainSource]
 */
export const isTuple = (x: object | undefined | null): x is TupleSource =>
  Array.isArray(x) &&
  x.length === 2 &&
  typeof x[0] === 'string' &&
  isPlain(x[1])

/**
 * Check if argument is ObjectSource, with PlainSources inside
 */
export const isObject = (x: Source | undefined | null): x is ObjectSource => {
  if (
    x == null ||
    typeof x !== 'object' ||
    Array.isArray(x) ||
    typeof x[Symbol.iterator] === 'function' ||
    x instanceof URL
  ) {
    return false
  }
  for (const key in x) {
    if (x.hasOwnProperty(key) && !isPlain(x[key])) return false
  }
  return true
}

/**
 * Check if argument is Iterable over PlainSource or TupleSource
 */
export const isIterable = (
  x: Source | undefined | null
): x is Iterable<PlainSource | TupleSource | ObjectSource> => {
  if (x == null || typeof x === 'string') return false
  if (typeof x[Symbol.iterator] === 'function') {
    for (const src of x as Iterable<Source | undefined | null>) {
      if (src == null) return false
      if (!isPlain(src) && !isTuple(src) && !isObject(src)) return false
    }
    return true
  }
  return false
}

/**
 * Check, if given argument is simple string, and presumably is is just file name
 * I hope no one will wants to use filename longer than 50 symbols :)
 */
const fileNameRE = /^[\w\s\(\),-]+\.[A-Za-z0-9]+$/
const MIN_FILE_NAME_LENGTH = 3
const MAX_FILE_NAME_LENGTH = 50
export const isFileName = (x: Source | undefined | null) =>
  isString(x) &&
  !x.startsWith('file:') && // in ideal world there should be `!isFileUri(x)`, but TypeScript sucks here
  x.length >= MIN_FILE_NAME_LENGTH &&
  x.length <= MAX_FILE_NAME_LENGTH &&
  fileNameRE.test(x)
