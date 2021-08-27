import { createWriteStream } from 'fs'
import { pipe, gotenberg, convert, html, adjust, please } from '../../src'

// need to run Gotenberg like this
// docker run --rm -p 3500:3000 gotenberg/gotenberg:7

pipe(
  gotenberg(''),
  convert, // it is save to remove this line, if you want
  html,
  adjust({
    // manually adjust endpoint, because
    // gotenberg:7 has different conversion endpoints
    url: 'http://localhost:3500/forms/chromium/convert/html',

    // manually adjust for fields
    fields: {
      printBackground: true,
      // `printBackground` is not valid field for gotenberg:6
      // so we have to cast to any, otherwise typescript will complain
    } as any,
  }),
  please
)('<html><body bgcolor="blue">test</body></html>')
  .then((pdf) => pdf.pipe(createWriteStream(`${__dirname}/html_with_bg.pdf`)))
  .catch(console.error)
