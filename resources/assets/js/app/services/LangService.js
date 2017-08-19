import * as Loc from 'react-localize-redux';
import moment from 'moment';

const LangService = (() => {
    let _store = null;
    let storage =  localStorage;
    const languages = ['en', 'uk_UA', 'ru'];
    return {
        init(store) {
            _store = store;
            moment.locale(this.getActiveLanguage());
            _store.dispatch(Loc.setLanguages(this.languages, this.getActiveLanguage()));
        },
        get languages() {
            return languages;
        },
        getName(code) {
            return {
                'en': 'en',
                'uk_UA': 'ua',
                'ru': 'ru'
            }[code];
        },
        setActiveLanguage(code) {
            storage.setItem('locale', code);
            moment.locale(code);
            _store.dispatch(Loc.setActiveLanguage(code))
        },
        getActiveLanguage() {
            return (languages.indexOf(storage['locale']) >=0 && storage['locale']) || 'en';
        },
        addTranslation(localeData) {
            _store.dispatch(Loc.addTranslation(localeData))
        },
        get translate() {
            return Loc.getTranslate(_store.getState().locale);
        }
    };
})();

export default LangService;