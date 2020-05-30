import { convert, gotenberg, office, pipe, please, url } from '../../src'

// following should throw an exception about double conversion
// >>> Cannot set "Office" conversion, already set to "Url"

const toPDF = pipe(gotenberg('http://localhost:8008'), convert, url, office, please)
toPDF('http://any.url.com').then(console.log).catch(console.error)
