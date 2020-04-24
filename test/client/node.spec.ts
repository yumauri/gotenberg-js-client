import nock from 'nock'
import FormData from 'form-data'
import { client } from '../../src/client/node'

// Helper function to get response JOSN body
async function toJSON(response: any) {
  const chunks: any[] = []
  const text = await new Promise<string>((resolve, reject) => {
    response.on('data', (chunk: any) => chunks.push(chunk))
    response.on('error', reject)
    response.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
  })
  return JSON.parse(text)
}

test('`client` should return functional client', () => {
  const clnt = client()
  expect(typeof clnt.get).toBe('function')
  expect(typeof clnt.post).toBe('function')
})

test('Should do GET request', async () => {
  nock('https://127.0.0.1:3000') //
    .get('/ping')
    .reply(200, { status: 'OK' })

  const clnt = client()
  const response = await clnt.get!('https://127.0.0.1:3000/ping')
  expect(await toJSON(response)).toEqual({ status: 'OK' })
})

test('Should throw on bad GET request', async () => {
  nock('https://127.0.0.1:3000') //
    .get('/ping')
    .reply(500)

  const clnt = client()
  let error: any
  try {
    await clnt.get!('https://127.0.0.1:3000/ping')
  } catch (e) {
    error = e
  }
  expect(error).toEqual(new Error('500 null'))
})

test('Should do POST request', async () => {
  nock('https://127.0.0.1:3000') //
    .post('/convert/html')
    .reply(200, { status: 'OK' })

  const clnt = client()
  const response = await clnt.post('https://127.0.0.1:3000/convert/html', new FormData())
  expect(await toJSON(response)).toEqual({ status: 'OK' })
})

test('Should throw on bad POST request', async () => {
  nock('https://127.0.0.1:3000') //
    .post('/convert/html')
    .reply(500, { status: 'ERROR' })

  const clnt = client()
  let error: any
  try {
    await clnt.post('https://127.0.0.1:3000/convert/html', new FormData())
  } catch (e) {
    error = e
  }
  expect(error).toEqual(new Error('500 null (undefined)')) // hm???
})

test('Should handle http', async () => {
  nock('http://127.0.0.1:3000') //
    .get('/ping')
    .reply(200, { status: 'OK' })

  const clnt = client()
  const response = await clnt.get!('http://127.0.0.1:3000/ping')
  expect(await toJSON(response)).toEqual({ status: 'OK' })
})
