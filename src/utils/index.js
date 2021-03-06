/**
 * Constructs a query string from an object.
 * @param {Object} params
 * @return {string}
 * @private
 */
const _queryParams = (params) =>
  Object.keys(params)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&')

/**
 * Wrapper for fetch to accept query params as options.
 * @param {string} url
 * @param {Object} options
 * @return {Function}
 */
export const request = (url, options = {}) => {
  if (options.queryParams) {
    url +=
      (url.indexOf('?') === -1 ? '?' : '&') + _queryParams(options.queryParams)

    delete options.queryParams
  }

  return fetch(url, options)
}

/**
 * Creates a new image in memory to detect when it's loaded.
 * @param {string} url
 * @return {Promise}
 */
export const loadImage = (url) =>
  new Promise((resolve, reject) => {
    const img = new Image()

    img.onload = () => resolve(url)
    img.onerror = () => reject(url)
    img.src = url
  })
