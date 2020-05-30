import { createWriteStream } from 'fs'
import { add, convert, gotenberg, headers, pipe, please, range, set, url } from '../../src'

// need to run Gotenberg like this
// docker run --rm -p 3500:3000 thecodingmachine/gotenberg:6

pipe(
  gotenberg('http://localhost:3500'),
  convert,
  url,
  add(
    headers({
      'Test-Header': 'Foo',
      'Test-Header-2': 'Bar',
    })
  ),
  set(range('1-1')),
  please
)(`https://request.urih.com/`)
  .then((pdf) => pdf.pipe(createWriteStream(`${__dirname}/headers.pdf`)))
  .catch(console.error)
