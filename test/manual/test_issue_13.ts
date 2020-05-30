import { createWriteStream } from 'fs'
import { convert, gotenberg, html, merge, pipe, please } from '../../src'

// need to run Gotenberg like this
// docker run --rm -p 3500:3000 thecodingmachine/gotenberg:6

const toPDF = pipe(gotenberg('http://localhost:3500'), convert, html, please)
const toMergedPDF = pipe(gotenberg('http://localhost:3500'), merge, please)

async function createPdf(filename: string, content: string) {
  const pdf = await toPDF(content)
  pdf.pipe(createWriteStream(filename))
  return new Promise((resolve) => pdf.on('end', resolve))
}

async function main() {
  // create
  await createPdf(`${__dirname}/test_issue_13-file1.pdf`, 'pdf file 1')
  await createPdf(`${__dirname}/test_issue_13-file2.pdf`, 'pdf file 2')
  await createPdf(`${__dirname}/test_issue_13-file3.pdf`, 'pdf file 3')

  // merge
  // const mPdf = await toMergedPDF([
  //   ['file1.pdf', `file://${__dirname}/test_issue_13-file1.pdf`],
  //   ['file2.pdf', `file://${__dirname}/test_issue_13-file2.pdf`],
  //   ['file3.pdf', `file://${__dirname}/test_issue_13-file3.pdf`],
  // ])
  const mPdf = await toMergedPDF([
    `file://${__dirname}/test_issue_13-file1.pdf`,
    `file://${__dirname}/test_issue_13-file2.pdf`,
    `file://${__dirname}/test_issue_13-file3.pdf`,
  ])
  mPdf.pipe(createWriteStream(`${__dirname}/test_issue_13-final.pdf`))
}

main().catch(console.log)
