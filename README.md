# Gotenberg JS/TS client

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
app.get('/pdf', function(req, res) {
  //...
  pdf.pipe(res)
})
```

You can define any source like `string`, `Buffer`, [file link](https://en.wikipedia.org/wiki/File_URI_scheme), `stream.Readable`, or `URL` (for url conversions).

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

Instead of array you can use any [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols), like `Map`, `Set`, `arguments`, iterator from generator function, or any object with `[Symbol.iterator]` defined.

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

## Markdown

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
  'index.html': `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>My PDF</title>
      </head>
      <body>
        {{ toHTML .DirPath "file.md" }}
      </body>
    </html>`,
  'file.md': 'file://file.md',
})
```

## Office

```typescript
import { pipe, gotenberg, convert, office, to, landscape, set, filename, please } from 'gotenberg-js-client'

const toPDF = pipe(
  gotenberg('http://localhost:3000'),
  convert,
  office,
  to(landscape),
  set(filename('result.pdf'))
  please
)

// --- 8< ---

const pdf = await toPDF('file://document.docx')
```

## Url

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

## Merge

Like you would think:

```typescript
import { pipe, gotenberg, merge, please } from 'gotenberg-js-client'

const toMergedPDF = pipe(
  gotenberg('http://localhost:3000'),
  merge,
  please
)
```

## Bonus

If you happen to use this package from JavaScript, you will, obviously, lost type safety, but in return, you can use proposed pipe operator (with [Babel plugin](https://github.com/tc39/proposal-pipeline-operator)), to get beauty like this:

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
