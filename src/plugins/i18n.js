import VueI18n from 'vue-i18n'
import ru from '../lang/ru.json'

export default ({ app, Vue }) => {
  Vue.use(VueI18n)
  app.i18n = new VueI18n({
    locale: 'ru',
    fallbackLocale: 'en',
    messages: {
      ru: ru
    }
  })
}
