import * as Loc from 'react-localize-redux';
import moment from 'moment';

export const LANG_UA = 'uk';
export const LANG_EN = 'en';
export const LANG_RU = 'ru';

const LangService = (() => {

    const languages = [LANG_EN, LANG_UA, LANG_RU];

    let _store = null;
        storage =  localStorage;

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
                [LANG_EN]: 'English',
                [LANG_UA]: 'Українська',
                [LANG_RU]: 'Русский',
            }[code];
        },

        setActiveLanguage(code) {
            storage.setItem('locale', code);
            moment.locale(code);
            _store.dispatch(Loc.setActiveLanguage(code));
        },

        getActiveLanguage() {
            return (languages.indexOf(storage['locale']) >=0 && storage['locale'])
                || this.getNavigatorLanguage()
                || LANG_EN;
        },

        getNavigatorLanguage() {
            const userLang = ((navigator.languages &&
                    navigator.languages.length &&
                    navigator.languages[0]
                )
                || navigator.userLanguage
                || navigator.language
                || '').toLowerCase().substr(0, 2);

            return (languages.indexOf(userLang) >=0 && userLang) || '';
        },

        addTranslation(localeData) {
            _store.dispatch(Loc.addTranslation(localeData));
        },

        get translate() {
            return Loc.getTranslate(_store.getState().locale);
        },

        getNumberForm(n) {
            if (n % 10 > 1 && n % 10 < 5 && (n < 10 || n > 20)) {
                return '2';
            }

            if (n % 10 === 1 && n % 100 !== 11) {
                return '1';
            }

            return '3';
        }
    };
})();

export default LangService;
