import { gotenberg, pipe, ping, please } from '../../src'

// need to run Gotenberg like this
// docker run --rm -p 3500:3000 thecodingmachine/gotenberg:6

// pipe(
//   gotenberg('http://localhost:3000'),
//   ping,
//   please
// )({}) // <- empty source object to satisfy typings
//   .then(() => console.log('Gotenberg is up'))
//   .catch((error) => console.error('Gotenberg is down:', error))

// ;(async () => {
//   try {
//     await pipe(gotenberg('http://localhost:3500'), ping, please)({})
//     console.log('Gotenberg is up')
//   } catch (error) {
//     console.error('Gotenberg is down:', error)
//   }
// })()

//
;(async () => {
  try {
    await please(ping(gotenberg('http://localhost:3500')({})))
    console.log('Gotenberg is up')
  } catch (error) {
    console.error('Gotenberg is down:', error)
  }
})()
