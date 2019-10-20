import path from './_path'

/**
 * Adjust Request url, by adding `/convert` to it
 * @return new HtmlRequest, doesn't modify original Request
 */
export default path('/convert')
