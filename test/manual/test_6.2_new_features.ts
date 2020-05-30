import { createWriteStream } from 'fs'
import { a4, convert, gotenberg, html, pipe, please, scale, set, to } from '../../src'

// need to run Gotenberg like this
// docker run --rm -p 3500:3000 thecodingmachine/gotenberg:6

pipe(
  gotenberg('http://localhost:3500'),
  convert,
  html,
  to(a4, {
    top: 0,
    right: 0.2, // ~5mm
    bottom: 0,
    left: 0.2, // ~5mm
  }),
  set(scale(0.5)),
  please
)(`file://${__dirname}/statement.html`)
  .then((pdf) => pdf.pipe(createWriteStream(`${__dirname}/scale.pdf`)))
  .catch(console.error)
