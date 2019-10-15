import { resolve } from 'path'
import { createReadStream } from 'fs'
import { GotenbergDocument } from './_GotenbergDocument'
import { Document } from './_Document'

/**
 * Document from file, for gotenberg conversions
 */
export class FileDocument extends Document implements GotenbergDocument {
  constructor(fileName: string, private readonly path: string) {
    super(fileName)
  }

  public getStream(): NodeJS.ReadableStream {
    return createReadStream(resolve(__dirname, this.path)) // FIXME: I guess __dirname will not work as I want
  }
}
