const { gotenberg, pipe, ping, please } = require('../../pkg')

// need to run Gotenberg like this
// docker run --rm -p 3500:3000 thecodingmachine/gotenberg:6

pipe(gotenberg('http://localhost:3500'), ping, please)()
  .then(() => console.log('Gotenberg is up'))
  .catch((error) => console.error('Gotenberg is down:', error))
