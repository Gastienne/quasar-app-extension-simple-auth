/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

let path = require('path')

const extendWithComponent = (conf) => {
  conf.boot.push('~@gastiennelea/quasar-app-extension-simple-auth/src/boot/index.js')

  conf.build.transpileDependencies.push(/@gastiennelea\/quasar-app-extension-simple-auth[\\/]src/)

  const requiredPlugins = ['Notify', 'Cookies'];

  requiredPlugins.forEach(plugin => {
    if (!conf.framework.plugins.includes(plugin)) {
      conf.framework.plugins.push(plugin)
    }
  })

  console.log('App Extension (simple-auth) Info: \'Adding simple-auth boot reference to your quasar.conf.js\'')
}

const chainWebpack = (ctx, chain) => {
  chain.resolve.alias.set('simple-auth', path.resolve(__dirname, './components'))
}

module.exports = function (api) {
  api.chainWebpack((chain) => chainWebpack(api.ctx, chain))

  api.extendQuasarConf(extendWithComponent)
}
