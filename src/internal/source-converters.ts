import { basename, extname } from 'path'
import { createReadStream, ReadStream } from 'fs'
import { Readable } from 'stream'
import { FileURI, PlainSource, Source, TupleSource, TupleStreamsSource } from '../_types'
import {
  isBuffer,
  isFileName,
  isFileUri,
  isIterable,
  isObject,
  isStream,
  isString,
  isTuple,
  isURL,
} from './source-checkers'

export const DEFAULT_FILENAME = 'index.html'

/**
 * Convert any possible source to tuples array
 */
export const toTuples = (source: Source, recursive = false): TupleSource[] => {
  // if single URL is given -> remove it (should be removed by `url`, but nonetheless)
  if (isURL(source)) return []

  // if single file uri
  if (isFileUri(source)) {
    return !recursive && extname(source) === '.html'
      ? [[DEFAULT_FILENAME, source]] // single file uri and not inside recursion -> assume this is 'index.html'
      : [[basename(source), source]] // if inside recursion or file is not .html -> just get name from file uri
  }

  // single string or buffer
  if (isString(source) || isBuffer(source)) {
    // just assume it is 'index.html', as most useful and common case
    return [[DEFAULT_FILENAME, source]]
  }

  // if single stream
  if (isStream(source)) {
    if (source instanceof ReadStream) {
      // file stream
      // https://nodejs.org/api/fs.html#fs_readstream_path
      const name = basename(String(source.path))
      return !recursive && extname(name) === '.html'
        ? [[DEFAULT_FILENAME, source]] // single file stream and not inside recursion -> assume this is 'index.html'
        : [[name, source]] // if inside recursion or file is not .html -> just get name from file uri
    } else {
      // some strange, not file stream -> just assume it is 'index.html'
      return [[DEFAULT_FILENAME, source]]
    }
  }

  // single tuple like we want to be -> just return it
  if (isTuple(source)) {
    if (isFileName(source[0])) {
      return [source]
    }
    throw new Error(`Source name "${source[0]}" doesn't look like file name`)
  }

  // if object source
  if (isObject(source)) {
    const ret: TupleSource[] = []
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        if (isFileName(key)) {
          ret.push([key, source[key]])
        } else {
          throw new Error(`Source name "${key}" doesn't look like file name`)
        }
      }
    }
    return ret
  }

  // if iterable source
  if (isIterable(source)) {
    const ret: TupleSource[] = []
    for (const src of source) {
      // recursively convert to tuples
      ret.push(...toTuples(src, true))
    }
    return ret
  }

  // if we get there, something is definitely wrong
  throw new Error(`Bad source, don't know what to do with "${source}"`)
}

/**
 * Read file to stream
 * `path` should starts with 'file:' or 'file://'
 * see https://en.wikipedia.org/wiki/File_URI_scheme
 */
export const fromFile = (path: FileURI): NodeJS.ReadableStream =>
  createReadStream(path.replace(/^file:(\/\/)?/, ''))

/**
 * Convert any plain source to stream
 */
export const toStream = (source: PlainSource): NodeJS.ReadableStream =>
  isStream(source)
    ? source
    : isFileUri(source)
    ? fromFile(source)
    : // https://nodejs.org/docs/latest-v10.x/api/stream.html#stream_new_stream_readable_options
      new Readable({
        read() {
          this.push(source)
          this.push(null)
        },
      })

/**
 * Convert any possible source to tuples array with streams only
 */
export const toStreams = (source?: Source): TupleStreamsSource[] => {
  if (!source) return []
  const tuples = toTuples(source)
  const ret: TupleStreamsSource[] = []
  for (let i = 0; i < tuples.length; i++) {
    ret.push([tuples[i][0], toStream(tuples[i][1])])
  }
  return ret
}
