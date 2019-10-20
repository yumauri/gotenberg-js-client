import { GotenbergClient } from './client'

////////////////////////////////////////////////////////////////////////////////
/// form fields ////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// common form fields, for any conversion
export type CommonRequestFields = {
  // It takes a float as value (e.g 2.5 for 2.5 seconds)
  // https://thecodingmachine.github.io/gotenberg/#timeout
  waitTimeout?: number

  // If provided, the API will send the resulting PDF file in a POST request with the `application/pdf` Content-Type to given URL
  // https://thecodingmachine.github.io/gotenberg/#webhook
  webhookURL?: string

  // It takes a float as value (e.g 2.5 for 2.5 seconds)
  // https://thecodingmachine.github.io/gotenberg/#webhook.timeout
  webhookURLTimeout?: number

  // If provided, the API will return the resulting PDF file with the given filename. Otherwise a random filename is used
  // Attention: this feature does not work if the form field webhookURL is given
  // https://thecodingmachine.github.io/gotenberg/#result_filename
  resultFilename?: string
}

// chrome form fields
export type ChromeRequestFields = {
  // The wait delay is a duration in seconds (e.g 2.5 for 2.5 seconds)
  // https://thecodingmachine.github.io/gotenberg/#html.wait_delay
  waitDelay?: number

  // It takes an integer as value (e.g. 1048576 for 1 MB). The hard limit is 100 MB and is defined by Google Chrome itself
  // https://thecodingmachine.github.io/gotenberg/#html.rpcc_buffer_size
  googleChromeRpccBufferSize?: number
}

// html conversion form fields
// https://thecodingmachine.github.io/gotenberg/#html
export type HtmlRequestFields = {
  // By default, it will be rendered with A4 size, 1 inch margins and portrait orientation
  // Paper size and margins have to be provided in inches. Same for margins
  // https://thecodingmachine.github.io/gotenberg/#html.paper_size_margins_orientation
  paperWidth?: number
  paperHeight?: number
  marginTop?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
  landscape?: boolean
}

// markdown conversion form fields
// Markdown conversions work the same as HTML conversions
// https://thecodingmachine.github.io/gotenberg/#markdown
export type MarkdownRequestFields = HtmlRequestFields

// office documents conversion form fields
// https://thecodingmachine.github.io/gotenberg/#office
export type OfficeRequestFields = {
  // By default, it will be rendered with portrait orientation
  // https://thecodingmachine.github.io/gotenberg/#office.orientation
  landscape?: boolean
}

// url conversion form fields
// Attention: when converting a website to PDF, you should remove all margins
// If not, some of the content of the page might be hidden
// https://thecodingmachine.github.io/gotenberg/#url
export type UrlRequestFields = {
  remoteURL?: string
}

// merge conversion doesn't have any form fields
// https://thecodingmachine.github.io/gotenberg/#merge
export type MergeRequestFields = {}

// all available form fields
export type RequestFields = CommonRequestFields &
  UrlRequestFields &
  HtmlRequestFields &
  MergeRequestFields &
  OfficeRequestFields &
  ChromeRequestFields &
  MarkdownRequestFields

////////////////////////////////////////////////////////////////////////////////
/// Html | Markdown | Office extended options (margins | page size) ////////////
////////////////////////////////////////////////////////////////////////////////

export type FieldsModifier = (fields: RequestFields) => void
export type PaperOptions =
  | [number, number]
  | { width?: number; height?: number }
export type MarginOptions =
  | [number, number, number, number]
  | { top?: number; right?: number; bottom?: number; left?: number }
export type ConversionOptions =
  | PaperOptions
  | MarginOptions
  | FieldsModifier
  | (HtmlRequestFields &
      OfficeRequestFields &
      MarkdownRequestFields & { paper?: PaperOptions } & {
        margins?: MarginOptions
      })

////////////////////////////////////////////////////////////////////////////////
/// available sources //////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

export type FileURI = string // TODO: https://github.com/microsoft/TypeScript/issues/6579
export type PlainSource = string | Buffer | FileURI | NodeJS.ReadableStream
export type TupleSource = [string, PlainSource]
export type ObjectSource = { [name: string]: PlainSource }
export type Source =
  | URL // for url conversions
  | PlainSource
  | TupleSource
  | ObjectSource
  | Iterable<PlainSource | TupleSource | ObjectSource>
export type TupleStreamsSource = [string, NodeJS.ReadableStream]

////////////////////////////////////////////////////////////////////////////////
/// request types //////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

export const enum RequestType {
  Url,
  Ping,
  Html,
  Merge,
  Office,
  Markdown,
  Undefined,
}

export type Request = {
  type: RequestType
  url: string
  client: GotenbergClient
  source?: Source
  fields: RequestFields
}

export type UrlRequest = Request & { type: RequestType.Url }
export type PingRequest = Request & { type: RequestType.Ping }
export type HtmlRequest = Request & { type: RequestType.Html }
export type MergeRequest = Request & { type: RequestType.Merge }
export type OfficeRequest = Request & { type: RequestType.Office }
export type MarkdownRequest = Request & { type: RequestType.Markdown }

export type TypedRequest =
  | UrlRequest
  | PingRequest
  | HtmlRequest
  | MergeRequest
  | OfficeRequest
  | MarkdownRequest
