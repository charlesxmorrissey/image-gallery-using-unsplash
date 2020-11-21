export function request(url, options = {}) {
  if (options.queryParams) {
    url +=
      (url.indexOf('?') === -1 ? '?' : '&') + queryParams(options.queryParams)

    delete options.queryParams
  }

  return fetch(url, options)
}

const queryParams = (params) =>
  Object.keys(params)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&')
