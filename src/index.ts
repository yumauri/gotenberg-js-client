export * from './client'
export * from './request'
export * from './document'
export * from './page'

// import { Client } from './client'
// import { FileDocument } from './document'
// import { HTMLRequest } from './request'
// import { A4 } from './page'
// import { createWriteStream } from 'fs'

//

//
/*
const client = new Client('http://localhost:3000')

client
  .do(
    new HTMLRequest(new FileDocument('index.html', '../../test/index.html'))
      .margins({
        top: 0,
        right: 0.2, // ~5mm
        bottom: 0,
        left: 0.2, // ~5mm
      })
      .paperSize(A4)
  )
  .then(res => {
    res.pipe(createWriteStream('test/invoice_statement.pdf'))
  })
  .catch(e => {
    console.log('Error:', e)
  })
*/
