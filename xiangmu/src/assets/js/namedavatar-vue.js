function AvatarImage (name, options) {
  this.name = name
  this.options = options
}

/**
* Create SVG node
* @param {string} name - picked name
* @param {Object} options - options
* @return {HTMLElement} - svg node
*/
AvatarImage.prototype.createSVG = function () {
  var svg = document.createElement('svg')
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')

  if ('width' in this.options) {
    var width = this.options.width
    var height = 'height' in this.options ? this.options.height : width

    svg.setAttribute('width', width)
    svg.setAttribute('height', height)
  }

  // <rect> background
  var rect = document.createElement('rect')

  rect.setAttribute('fill', this.getBackgroundColor())
  rect.setAttribute('x', 0)
  rect.setAttribute('y', 0)
  rect.setAttribute('width', '100%')
  rect.setAttribute('height', '100%')

  svg.appendChild(rect)

  if (typeof this.name === 'string' && this.name.length > 0) {
    // <text> name
    var text = document.createElement('text')

    text.setAttribute('fill', this.getTextColor())
    text.setAttribute('x', '50%')
    text.setAttribute('y', '50%')
    text.setAttribute('text-anchor', 'middle')
    text.setAttribute('font-size', this.getFontSize())
    text.setAttribute('font-family', this.getFontFamily())

    // IE/Edge don't support alignment-baseline
    // @see https://msdn.microsoft.com/en-us/library/gg558060(v=vs.85).aspx
    if (document.documentMode || /Edge/.test(navigator.userAgent)) {
      text.setAttribute('dy', '0.35em')
    } else {
      text.setAttribute('alignment-baseline', 'middle')
    }

    text.textContent = this.name

    svg.appendChild(text)
  }

  return svg
}

/**
* get text color
* @return {string} - css color format
*/
AvatarImage.prototype.getTextColor = function () {
  return this.options.textColor
}
/**
* get text font size
* @return {number} - px number
*/
AvatarImage.prototype.getFontSize = function () {
  var textWidth = this.name.length * (this.name.charCodeAt(0) < 256 ? 0.75 : 1.5)
  var availableWidth = this.options.width || 32

  var fontSize = Math.round(availableWidth / textWidth)
  if (fontSize < this.options.minFontSize) {
    this.name = this.name[0].toUpperCase()
    fontSize = this.options.maxFontSize
  } else if (fontSize > this.options.maxFontSize) {
    fontSize = this.options.maxFontSize
  }
  return fontSize
}
/**
* get text font family
* @return {string} - font family
*/
AvatarImage.prototype.getFontFamily = function () {
  return this.options.fontFamily
}
/**
* get background color
* @return {string} - css background-color format
*/
AvatarImage.prototype.getBackgroundColor = function () {
  if ('backgroundColor' in this.options) {
    return this.options.backgroundColor
  }

  var bgColors = this.options.backgroundColors

  var index
  if (this.name) {
    index = this.name.charCodeAt(0) % bgColors.length
  } else {
    index = Math.floor(Math.random() * bgColors.length)
  }
  return bgColors[index]
}

/**
 * simple polyfill Object.assign for IE <= 11
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 * @param {Object} target - target options
 * @param {Object} options - new options
 */
function extendOptions (target, options) {
  if (typeof Object.assign === 'function') {
    Object.assign(target, options)
  } else {
    // for IE < 11
    for (var key in options) {
      target[key] = options[key]
    }
  }
}

/**
 * global config
 */
function namedavatar () {}
namedavatar.options = {
  // pick type, eg. firstNmae, lastName, initials
  nameType: 'lastName',

  // font family list
  fontFamily: 'Verdana, Geneva, sans-serif',

  // pick from https://material.io/guidelines/style/color.html#color-color-tool
  backgroundColors: [
    '#1D8FE1', '#E8A010', '#0BA194',
    '#E8541E'
  ],

  // font color default white
  textColor: '#FFF',

  // font size default between 8 and 16
  minFontSize: 8,
  maxFontSize: 16
}

/**
 * set global config
 * @param {Object} options - extended global options
 */
namedavatar.config = function (options) {
  if (options && typeof options === 'object') {
    extendOptions(this.options, options)
  }
}

/**
 * set named avatar of imgs
 * @param {HTMLImageElement[]} imgs - <img> node list
 * @param {string} attr - attribute name, eg. alt, data-name
 */
namedavatar.setImgs = function (imgs, attr) {
  for (var i = 0; i < imgs.length; i++) {
    this.setImg(imgs[i], imgs[i].getAttribute(attr))
  }
}

/**
 * set named avatar of img
 * @param {HTMLImageElement} img - <img> node
 * @param {string} fullName - full name
 */
namedavatar.setImg = function (img, fullName) {
  var options = {}
  if (!('width' in this.options) && img.width) {
    options.width = img.width
  }

  var svg = this.getSVG(fullName, options)

  var uri = 'data:image/svg+xml,' + encodeURIComponent(svg.outerHTML)
  img.setAttribute('src', uri)
}

/**
 * get avatar svg node
 * @param {string} fullName - full name
 * @param {Object} tempOptions - local extended options
 * @return {HTMLElement} - <svg> node
 */
namedavatar.getSVG = function (fullName, tempOptions) {
  var options = {}
  extendOptions(options, this.options)
  extendOptions(options, tempOptions)

  var avatarName = new AvatarName(fullName, options)
  var name = avatarName.getName()

  var avatarImage = new AvatarImage(name, options)
  return avatarImage.createSVG()
}

/**
 * namedavatar name
 * @module AvatarName
*/
/**
 * pick name
 * @class
 * @param {string} fullName - full name
 * @param {Object} options - options
 */
function AvatarName (fullName, options) {
  this.fullName = fullName
  this.options = options
}

/**
 * pick display name from full name
 * @return {string} name - picked name
 */
AvatarName.prototype.getName = function () {
  var fullName = this.fullName
  if (!fullName) {
    return
  }

  var name = fullName

  var isASCII = fullName.charCodeAt(0) < 256
  if (isASCII) {
    var names = fullName.split(' ')
    switch (this.options.nameType) {
      case 'firstName':
        name = names[0]
        break
      case 'lastName':
        name = names[names.length - 1]
        break
      case 'initials':
        name = ''
        for (var i = 0; i < names.length; i++) {
          name += names[i].charAt(0).toUpperCase()
        }
        break
    }

    if (name.length > 6) {
      name = name.charAt(0).toUpperCase()
    }
  } else {
    switch (this.options.nameType) {
      case 'lastName':
        name = fullName.slice(fullName.length - 1)
        break
      case 'initials':
        name = fullName.slice(0, 1)
        break
      case 'firstName':
        name = fullName.slice(1)
        break
    }
  }
  return name
}
/**
 * Vue directive bind
 * @example
 * var namedavatarVueDirective = require('namedavatar/vue/directive')
 * Vue.directive('avatar', namedavatarVueDirective)'
 */
var directive = function (el, binding) {
  // if image is load success
  if (el instanceof HTMLImageElement) {
    if (el.naturalWidth && el.src.indexOf('data:') !== 0) {
      return
    }
  }
  namedavatar.setImg(el, binding.value)
}
  /**
   * Vue Plugin
   * @example
   * var namedavatarVue = require('namedavatar/vue')
   * Vue.use(namedavatarVue)
   */
export default {
  install: function (Vue, options) {
    namedavatar.config(options)
    Vue.namedavatar = namedavatar

    // support v-avatar="username"
    Vue.directive('avatar', directive)
  },
  directive: directive
}
