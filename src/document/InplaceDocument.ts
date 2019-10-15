import { Readable } from 'stream'
import { GotenbergDocument } from './_GotenbergDocument'
import { Document } from './_Document'

/**
 * Readable stream from string
 * https://medium.com/@dupski/nodejs-creating-a-readable-stream-from-a-string-e0568597387f
 */
class ReadableBuffer extends Readable {
  private sent = false
  private readonly body: Buffer

  constructor(body: string | Buffer) {
    super()
    this.body = body instanceof Buffer ? body : Buffer.from(body)
  }

  _read() {
    if (!this.sent) {
      this.push(this.body)
      this.sent = true
    } else {
      this.push(null)
    }
  }
}

/**
 * Document from string or Buffer, for gotenberg conversions
 */
export class InplaceDocument<T extends string | Buffer> extends Document
  implements GotenbergDocument {
  constructor(fileName: string, private readonly body: T) {
    super(fileName)
  }

  public getStream(): NodeJS.ReadableStream {
    return new ReadableBuffer(this.body)
  }
}

/**
 * Aliase for Document from string, for gotenberg conversions
 * Use class/extends instead of type alias to preserve this identifier after compilation
 */
export class StringDocument extends InplaceDocument<string> {}

/**
 * Aliase for Document from Buffer, for gotenberg conversions
 * Use class/extends instead of type alias to preserve this identifier after compilation
 */
export class BufferDocument extends InplaceDocument<Buffer> {}
