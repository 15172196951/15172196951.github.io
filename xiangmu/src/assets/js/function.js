export function getWinHei (hei) {
  let heiRem = (document.documentElement.clientHeight || document.body.clientHeight) * 18.75 / (document.documentElement.clientWidth || document.body.clientWidth)
  return heiRem - hei + 'rem'
}
