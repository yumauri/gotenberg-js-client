import fs from 'fs'
import * as got from '../../src'

// need to run Gotenberg like this
// docker run --rm -p 3500:3000 gotenberg/gotenberg:7

got
  .pipe(
    got.gotenberg(''),
    got.merge,
    got.adjust({
      // manually adjust endpoint, because
      // gotenberg:7 has different one
      url: 'http://localhost:3500/forms/libreoffice/convert',

      // manually adjust for fields
      fields: {
        merge: true,
        // `merge` is not valid field for gotenberg:6
        // so we have to cast to any, otherwise typescript will complain
      } as any, // if you don't use typescript, just remove `as any` casting
    }),
    got.please
  )({
    'in1.docx': `file://${__dirname}/in1.docx`,
    'in2.docx': `file://${__dirname}/in2.docx`,
    'in3.docx': `file://${__dirname}/in3.docx`,
  })
  .then((pdf) => pdf.pipe(fs.createWriteStream(`${__dirname}/out1.pdf`)))
  .catch(console.error)
