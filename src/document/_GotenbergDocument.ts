export interface GotenbergDocument {
  getFileName(): string
  getStream(): NodeJS.ReadableStream
}
