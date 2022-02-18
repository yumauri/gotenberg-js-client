# Gotenberg JS/TS client

[![Build Status](https://github.com/yumauri/gotenberg-js-client/workflows/build/badge.svg)](https://github.com/yumauri/gotenberg-js-client/actions?workflow=build)
[![Coverage Status](https://coveralls.io/repos/github/yumauri/gotenberg-js-client/badge.svg?branch=master)](https://coveralls.io/github/yumauri/gotenberg-js-client?branch=master)
[![License](https://img.shields.io/github/license/yumauri/gotenberg-js-client.svg?color=yellow)](./LICENSE)
[![NPM](https://img.shields.io/npm/v/gotenberg-js-client)](https://www.npmjs.com/package/gotenberg-js-client)
![Made with Love](https://img.shields.io/badge/made%20with-❤-red.svg)

A simple JS/TS client for interacting with a [Gotenberg](https://thecodingmachine.github.io/gotenberg/) API.<br>
[Gotenberg](https://thecodingmachine.github.io/gotenberg/) is a Docker-powered stateless API for converting HTML, Markdown and Office documents to PDF.

- HTML and Markdown conversions using Google Chrome headless
- Office conversions (.txt, .rtf, .docx, .doc, .odt, .pptx, .ppt, .odp and so on) using [unoconv](https://github.com/dagwieers/unoconv)
- Assets: send your header, footer, images, fonts, stylesheets and so on for converting your HTML and Markdown to beautiful PDFs!
- Easily interact with the API using [Go](https://github.com/thecodingmachine/gotenberg-go-client) and [PHP](https://github.com/thecodingmachine/gotenberg-php-client) libraries (and now - JavaScript too ;)

## Install

```bash
$ yarn add gotenberg-js-client
```

Or using `npm`

```bash
$ npm install --save gotenberg-js-client
```

## NB ⚠️

This library is not yet fully compatible with Gotenberg 7.<br/>
You can find more info in [this comment](https://github.com/yumauri/gotenberg-js-client/issues/32#issuecomment-981140727).

There are three main issues:

- Gotenberg 7 has introduced new concept of conversion modules, thus, changing conversion URLs, so now they are different, than ones, this library creates. This can be sidestepped using custom connection string or adjusting URL manually (see [this comment](https://github.com/yumauri/gotenberg-js-client/issues/32#issuecomment-981140727)).
- New modules has some new possibilities/parameters, which are impossible to pass, using this library. This can be sidestepped using `adjust`, and casting to `any`, if you use TypeScript (see [this issue](https://github.com/yumauri/gotenberg-js-client/issues/33) for reference).
- Gotenberg 7 can potentially has many many different custom conversion modules, you can even write your own one. You can combine p.1 and p.2 to use any module with any path with any parameters, but I guess it will look not good. But it should work nonetheless.

So, nothing you can live without, but there are some inconveniences. For a while ;)

## Usage

```typescript
import { pipe, gotenberg, convert, html, please } from 'gotenberg-js-client'

const toPDF = pipe(
  gotenberg('http://localhost:3000'),
  convert,
  html,
  please
)

// --- 8< ---

// convert file from disk
const pdf = await toPDF('file://index.html')

// or convert stream
const pdf = await toPDF(fs.createReadStream('index.html'))

// or convert string!
const pdf = await toPDF('<html>...</html>')

// library returns NodeJS.ReadableStream,
// so you can save it to file, if you want, for example
pdf.pipe(fs.createWriteStream('index.pdf'))

// or you can send it as response in Express application
app.get('/pdf', function (req, res) {
  //...
  pdf.pipe(res)
})
```

You can define any source like `string`, `Buffer`, [file link](https://en.wikipedia.org/wiki/File_URI_scheme), `stream.Readable`, or `URL` (for url conversions).<br>
Detailed sources format you can find [here](https://github.com/yumauri/gotenberg-js-client/wiki/Source).

## Header, footer and assets

You can define sources as array or object, for example:

```typescript
// `toPDF` function is defined above ↑↑↑

// as object
const pdf = await toPDF({
  'index.html': 'file://index.html',
  'header.html': 'file://header.html',
  'footer.html': 'file://footer.html',
  'style.css': 'file://style.css',
  'img.png': 'file://img.png',
  'font.wof': 'file://font.wof',
})

// as array of tuples
const pdf = await toPDF([
  ['index.html', 'file://index.html'],
  ['header.html', 'file://header.html'],
  ['footer.html', 'file://footer.html'],
])

// as even 1-dimensional array of files
// in that case filenames will be retrieved from file path
const pdf = await toPDF([
  'file://index.html',
  'file://header.html',
  'file://footer.html',
])
```

Instead of array you can use any [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols), like `Map`, `Set`, `arguments`, iterator from generator function, or any object with `[Symbol.iterator]` defined.<br>
Detailed sources format you can find [here](https://github.com/yumauri/gotenberg-js-client/wiki/Source).

## Paper size, margins, orientation

When converting HTML or Markdown, you can use `to` helper, to set paper size, margins and orientation:

```typescript
import {
  pipe,
  gotenberg,
  convert,
  html,
  please,
  to,
  a4,
  landscape,
} from 'gotenberg-js-client'

const toPDF = pipe(
  gotenberg('http://localhost:3000'),
  convert,
  html,
  to(a4, landscape),
  please
)
```

You can use simple object(s) for `to` argument(s) as well:

```typescript
//...
to({
  paperWidth: 8.27,
  paperHeight: 11.69,
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  landscape: true,
})
//...

// or
to([8.27, 11.69], [0, 0, 0, 0], { landscape: true })
//...

// or
to({ paper: [8.27, 11.69], margins: [0, 0, 0, 0], landscape: true })
//...

// or
to({ width: 8.27, height: 11.69 }, { landscape: true })
//...

// or
to({ top: 0, bottom: 0 })
//...

// or any other combination
```

When using array for paper size, order should be `[width, height]`<br>
When using array for margins, order should be `[top, right, bottom, left]` (just like in CSS)

## Common options

You can set common options, like [resultFilename](https://thecodingmachine.github.io/gotenberg/#result_filename), or [waitTimeout](https://thecodingmachine.github.io/gotenberg/#timeout), or, actually, you can override _any_ option, using `set` helper:

```typescript
//...
set({
  resultFilename: 'foo.pdf',
  waitTimeout: 2.5,
})
//...
```

There are some _modifiers_ functions as well, like `filename`, `timeout`, `delay`, `webhook` and `googleChromeRpccBufferSize`:

```typescript
//...
set(filename('foo.pdf'), timeout(2.5))
//...
```

Also you can specify page ranges using `set(range)` (will not work with `merge`):

```typescript
//...
set(range('1-1'))
//...
```

or scale, using `set(scale)` (works with HTML, Markdown and URL conversions):

```typescript
//...
set(scale(0.75))
//...
```

## Markdown // [Gotenberg documentation](https://thecodingmachine.github.io/gotenberg/#markdown)

```typescript
import { pipe, gotenberg, convert, markdown, please } from 'gotenberg-js-client'

const toPDF = pipe(
  gotenberg('http://localhost:3000'),
  convert,
  markdown,
  please
)

// --- 8< ---

const pdf = await toPDF({
  'index.html': `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>My PDF</title>
      </head>
      <body>
        {{ toHTML .DirPath "content.md" }}
      </body>
    </html>`,

  'content.md': `
    # My awesome markdown
    ...
  `,
})
```

Note: I use strings here as an example, remind that you can use other supported [source](https://github.com/yumauri/gotenberg-js-client/wiki/Source) type.

## Office // [Gotenberg documentation](https://thecodingmachine.github.io/gotenberg/#office)

```typescript
import {
  pipe,
  gotenberg,
  convert,
  office,
  to,
  landscape,
  set,
  filename,
  please,
} from 'gotenberg-js-client'

const toPDF = pipe(
  gotenberg('http://localhost:3000'),
  convert,
  office,
  to(landscape),
  set(filename('result.pdf')),
  please
)

// --- 8< ---

const pdf = await toPDF('file://document.docx')
```

Note: I use [file link](https://en.wikipedia.org/wiki/File_URI_scheme) here as an example, remind that you can use other supported [source](https://github.com/yumauri/gotenberg-js-client/wiki/Source) type, say, `Buffer`, or `stream.Readable`:

```typescript
https.get(
  'https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.docx',
  async (document) => {
    const pdf = await toPDF({ 'document.docx': document })
    // ...
  }
)
```

## Url // [Gotenberg documentation](https://thecodingmachine.github.io/gotenberg/#url)

```typescript
import { pipe, gotenberg, convert, url, please } from 'gotenberg-js-client'

const toPDF = pipe(
  gotenberg('http://localhost:3000'),
  convert,
  url,
  please
)

// --- 8< ---

// you can use link as string
const pdf = await toPDF('https://google.com')

// or URL object
const pdf = await toPDF(new URL('https://google.com'))
```

Note: The only supported source for Url conversion is text url or instance of `URL` class.

You can set remote url header (for example, for [authentication](https://github.com/thecodingmachine/gotenberg/issues/81) or [host specifying](https://github.com/thecodingmachine/gotenberg/issues/116)) with helper `add(header)` (or `add(headers)`, or both):

```typescript
const toPDF = pipe(
  gotenberg('http://localhost:3000'),
  convert,
  url,
  add(
    header('Foo-Header', 'Foo'),
    header('Bar-Header', 'Bar'),
    headers({ 'Baz1-Header': 'Baz1', 'Baz2-Header': 'Baz2' })
  ),
  please
)
```

(This also applies for Webhook headers, just use `webhookHeader` instead of `header` and `webhookHeaders` instead of `headers`).

## Merge // [Gotenberg documentation](https://thecodingmachine.github.io/gotenberg/#merge)

Like you would think:

```typescript
import { pipe, gotenberg, merge, please } from 'gotenberg-js-client'

const toMergedPDF = pipe(
  gotenberg('http://localhost:3000'),
  merge,
  please
)
```

## Advanced fine adjustment

There is special function `adjust`, which you can use to modify _any_ field in prepared internal `Request` object. You can check internal `Request` object structure in types. Any object, passed to `adjust`, will be merged with prepared `Request`.

For example, you can modify `url`, if your Gotenberg instance is working behind reverse proxy with some weird url replacement rules:

```typescript
import { pipe, gotenberg, convert, html, adjust, please } from 'gotenberg-js-client'

// Original Gotenberg HTML conversion endpoint is
//   -> /convert/html
// But your reverse proxy uses location
//   -> /hidden/html/conversion
const toPDF = pipe(
  gotenberg('http://localhost:3000'),
  convert,
  html,
  adjust({ url: '/hidden/html/conversion' }),
  please
)
```

But, using that function, remember about Peter Parker principle:
> "With great power comes great responsibility"

## Bonus

If you happen to use this package from JavaScript, you will, obviously, lost type safety, but in return, you can use [proposed pipe operator](https://github.com/tc39/proposal-pipeline-operator) (with [Babel plugin](https://babeljs.io/docs/en/babel-plugin-proposal-pipeline-operator)), to get beauty like this:

```javascript
const toPDF = source =>
  source
    |> gotenberg('http://localhost:3000')
    |> convert
    |> html
    |> to(a4, noMargins)
    |> set(filename('out.pdf'))
    |> please
```

## Names clashes

If you don't like to have simple imported names in your namespace, you can use `import *` syntax:

```typescript
import * as got from 'gotenberg-js-client'

const toPDF = got.pipe(
  got.gotenberg('http://localhost:3000'),
  got.convert,
  got.html,
  got.please
)
```

## Sponsored

[<img src="https://setplex.com/img/logo.png" alt="Setplex OTT Platform" width="236">](https://setplex.com/en/)

[Setplex OTT Platform](https://setplex.com/en/)
