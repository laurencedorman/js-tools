/**
 * @param {Object} urlParams
 */
module.exports = urlParams =>
  Object.entries(urlParams)
    .map(([key, value]) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join('&');
