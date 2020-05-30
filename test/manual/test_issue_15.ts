import https from 'https'
import { createWriteStream } from 'fs'
import { convert, gotenberg, office, pipe, please } from '../../src'

// need to run Gotenberg like this
// docker run --rm -p 3500:3000 thecodingmachine/gotenberg:6

const toPDF = pipe(gotenberg('http://localhost:3500'), convert, office, please)

// https://file-examples.com/index.php/sample-documents-download/sample-doc-download/
https.get(
  'https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.docx',
  async (document) => {
    const pdf = await toPDF({ 'document.docx': document })
    pdf.pipe(createWriteStream(`${__dirname}/test_issue_15.pdf`))
  }
)
