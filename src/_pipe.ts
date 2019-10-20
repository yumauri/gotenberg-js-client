/**
 * Simple `pipe` implementation
 */
function pipe<T, R>(f1: (request: T) => R): (source: T) => R
function pipe<T, T1, R>(
  f1: (request: T) => T1,
  f2: (request: T1) => R
): (source: T) => R
function pipe<T, T1, T2, R>(
  f1: (request: T) => T1,
  f2: (request: T1) => T2,
  f3: (request: T2) => R
): (source: T) => R
function pipe<T, T1, T2, T3, R>(
  f1: (request: T) => T1,
  f2: (request: T1) => T2,
  f3: (request: T2) => T3,
  f4: (request: T3) => R
): (source: T) => R
function pipe<T, T1, T2, T3, T4, R>(
  f1: (request: T) => T1,
  f2: (request: T1) => T2,
  f3: (request: T2) => T3,
  f4: (request: T3) => T4,
  f5: (request: T4) => R
): (source: T) => R
function pipe<T, T1, T2, T3, T4, T5, R>(
  f1: (request: T) => T1,
  f2: (request: T1) => T2,
  f3: (request: T2) => T3,
  f4: (request: T3) => T4,
  f5: (request: T4) => T5,
  f6: (request: T5) => R
): (source: T) => R

// implementation
function pipe<T>(...fns: Array<(request: T) => T>) {
  return (source: T): T => fns.reduce((request, fn) => fn(request), source)
}

export default pipe
