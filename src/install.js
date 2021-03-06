/**
 * Quasar App Extension install script
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/install-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/InstallAPI.js
 */

module.exports = function (api) {
    api.compatibleWith('quasar', "^2.0.0")
    api.compatibleWith('@quasar/app', "^3.0.0")

    if (!api.hasPackage('validator')) {
        api.extendPackageJson({
            dependencies: {
                validator: "^13.6.0"
            }
        })
    }
}
