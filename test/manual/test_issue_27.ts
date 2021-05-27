import { createWriteStream } from 'fs'
import { convert, gotenberg, html, pipe, please } from '../../src'

// need to run Gotenberg like this
// docker run --rm -p 3500:3000 thecodingmachine/gotenberg:6
;(async () => {
  const toPDF = pipe(gotenberg('http://localhost:3500'), convert, html, please)
  const pdf = await toPDF('<html><header></header><body>Make my day</body></html>')
  pdf.pipe(createWriteStream(`${__dirname}/test_issue_27.pdf`))
})()
