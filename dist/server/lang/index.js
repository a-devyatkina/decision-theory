let i18n = require("i18n")
i18n.configure({
  locales: ['ru'],
  directory: __dirname + '/locales'
});

i18n.setLocale('ru')

module.exports = i18n
