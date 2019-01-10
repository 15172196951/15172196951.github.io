
const myCookie = {
  /*
    描述：查找 cookie 取值
    参数列表：
    * @param {String} name：cookie 名称
    * @return: {String}
  */
  get: (name) => {
    let cookie = document.cookie
    let cookieName = encodeURIComponent(name) + '='
    let start = cookie.indexOf(cookieName)
    let value = null
    if (start > -1) {
      var cookieEnd = document.cookie.indexOf(';', start)
      if (cookieEnd === -1) {
        cookieEnd = document.cookie.length
      }
      value = decodeURIComponent(document.cookie.substring(start + cookieName.length, cookieEnd))
    }
    return value
  },
  /*
    描述：设置 cookie
    参数列表：
    * @param {String} name：名称
    * @param {String} value：值
    * @param {Date} expires： 过期时间
    * @param {String} path：目录
    * @param {String} domain：域
    * @param {String} secure：安全标志
    * @return: {无}
    */
  set: (name, value, expires, path, domain, secure) => {
    var text = encodeURIComponent(name) + '=' + encodeURIComponent(value)
    if (expires instanceof Date) {
      text += ';expires=' + expires.toGMTString()
    }
    if (path) {
      text += ';path=' + path
    }
    if (domain) {
      text += ';domain=' + domain
    }
    if (secure) {
      text += ';secure'
    }
    document.cookie = text
  },
  /*
    描述：删除cookie ，通过设置时间为过去的时间使cookie失效从而达到目的
    参数列表：
    * @param {String} name：名称
    * @param {String} path：目录
    * @param {String} domain：域
    * @param {String} secure：安全标志
    * @return: {无}
    */
  unset: (name, path, domain, secure) => {
    myCookie.set(name, '', new Date(0), path, domain, secure)
  }
}
export default myCookie
