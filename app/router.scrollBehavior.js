const VueScrollTo = require('vue-scrollto');

export default async (to, from, savedPosition) => {

  if (savedPosition) {
    return savedPosition
  }

  const findEl = async (hash, x) => {
    return document.querySelector(hash) ||
      new Promise((resolve, reject) => {
        if (x > 50) {
          return resolve()
        }
        setTimeout(() => { resolve(findEl(hash, ++x || 1)) }, 100)
      })
  };

  if (to.hash) {
    let el = await findEl(to.hash)
    if ('scrollBehavior' in document.documentElement.style) {
      return VueScrollTo.scrollTo(el, 800)
      //return el.scrollIntoView({ behavior: 'smooth' });
    } else {
      return window.scrollTo(0, el.offsetTop)
      //return window.scrollTo(0, el.getBoundingClientRect().top+window.scrollY)
    }
  }
  return {x: 0, y: 0}
}
