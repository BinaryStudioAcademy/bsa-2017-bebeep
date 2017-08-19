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
        },
        getNumberForm(n) {
            if (n % 10 > 1 && n % 10 < 5 && (n < 10 || n > 20)) {
                return '2';
            } else if (n % 10 === 1 && n % 100 !== 11) {
                return '1';
            } else {
                return '3';
            }
        }
    };
})();

export default LangService;