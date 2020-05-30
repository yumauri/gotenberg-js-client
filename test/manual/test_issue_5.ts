import { createWriteStream, readFileSync } from 'fs'
import { convert, gotenberg, office, pipe, please } from '../../src'

// need to run Gotenberg like this
// docker run --rm -p 3500:3000 thecodingmachine/gotenberg:6

const buffer = readFileSync('document.docx')

pipe(
  gotenberg('http://localhost:3500'),
  convert,
  office,
  please
)(['doc.docx', buffer])
  .then((pdf) => pdf.pipe(createWriteStream(`${__dirname}/document.pdf`)))
  .catch(console.error)
