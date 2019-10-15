import { GotenbergDocument } from './_GotenbergDocument'

/**
 * Abstract Document for gotenberg conversions
 */
export abstract class Document implements GotenbergDocument {
  constructor(private readonly fileName: string) {}

  public getFileName(): string {
    return this.fileName
  }

  abstract getStream(): NodeJS.ReadableStream
}

/**
 * Reduce function, used in `reduce` header
 */
const reduceFn = (
  map: { [filename: string]: Document },
  document: Document
) => {
  map[document.getFileName()] = document
  return map
}

/**
 * Helper function to reduce array of documents to map
 */
export const reduce = (documents: Document[]) =>
  documents.reduce(reduceFn, Object.create(null))
