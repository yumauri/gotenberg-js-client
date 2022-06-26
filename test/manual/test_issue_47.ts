import { createWriteStream } from 'fs'
import { pipe, gotenberg, convert, url, to, please } from '../../src'
import got from 'got'

// need to run Gotenberg like this
// docker run --rm -p 3500:3000 gotenberg/gotenberg:7

// const got = await import('got')

// you can pass any config for your client
// as third argument in `gotenberg` function
const client = {
  post: (url, body, headers) => Promise.resolve(got.post({ url, body, headers, isStream: true })),
}

pipe(
  gotenberg(`http://localhost:3500/forms/chromium`, client),
  convert,
  url,
  to({ margins: [0, 0, 0, 0] }),
  (request) => {
    ;(request.fields as any).url = request.fields.remoteURL
    delete request.fields.remoteURL
    return request
  },
  please
)(`https://www.google.com`)
  .then((pdf) => pdf.pipe(createWriteStream(`${__dirname}/google_via_got.pdf`)))
  .catch(console.error)
