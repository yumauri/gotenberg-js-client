import { GotenbergDocument } from './_GotenbergDocument'
import { Document } from './_Document'

/**
 * Document from stream.Readable, for gotenberg conversions
 */
export class StreamDocument extends Document implements GotenbergDocument {
  constructor(
    fileName: string,
    private readonly stream: NodeJS.ReadableStream
  ) {
    super(fileName)
  }

  public getStream(): NodeJS.ReadableStream {
    return this.stream
  }
}
