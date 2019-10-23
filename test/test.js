const { createWriteStream } = require('fs')
const { a4, convert, gotenberg, html, pipe, please, to } = require('../pkg')

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
  please
)(`file://${__dirname}/statement.html`)
  .then(pdf => pdf.pipe(createWriteStream(`${__dirname}/statement.pdf`)))
  .catch(console.error)
