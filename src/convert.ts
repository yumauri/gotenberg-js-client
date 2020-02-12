import { path } from './internal/path'

/**
 * Adjust Request url, by adding `/convert` to it
 * @return new HtmlRequest, doesn't modify original Request
 */
export const convert = path('/convert')
