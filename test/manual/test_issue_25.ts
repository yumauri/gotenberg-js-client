import { createWriteStream } from 'fs'
import { convert, gotenberg, landscape, pipe, please, to, url } from '../../src'

// need to run Gotenberg like this
// docker run --rm -p 3500:3000 thecodingmachine/gotenberg:6

pipe(
  gotenberg('http://localhost:3500'),
  convert,
  url,
  to(landscape),
  please
)('https://google.com')
  .then((pdf) => pdf.pipe(createWriteStream(`${__dirname}/google.pdf`)))
  .catch(console.error)
