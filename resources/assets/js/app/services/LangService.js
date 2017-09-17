import * as Loc from 'react-localize-redux';
import moment from 'moment';

import DataStorage from '../helpers/DataStorage';

export const LANG_UA = 'uk';
export const LANG_EN = 'en';
export const LANG_RU = 'ru';

export const LANG_PROP_CODE = 'code';
export const LANG_PROP_SHORT_NAME = 'short_name';
export const LANG_PROP_FULL_NAME = 'full_name';

const LANG_DATA = {
    [LANG_PROP_SHORT_NAME]: {
        [LANG_UA]: 'ua',
        [LANG_EN]: 'en',
        [LANG_RU]: 'ru',
    },
    [LANG_PROP_FULL_NAME]: {
        [LANG_UA]: 'Українська',
        [LANG_EN]: 'English',
        [LANG_RU]: 'Русский',
    },
};

const LangService = (() => {

    const languages = [LANG_EN, LANG_UA, LANG_RU];
    let _store = null;

    return {
        init(store) {
            _store = store;

            moment.locale(this.getActiveLanguage(LANG_PROP_CODE));
            _store.dispatch(Loc.setLanguages(
                this.languages, this.getActiveLanguage(LANG_PROP_CODE)
            ));
        },

        get languages() {
            return languages;
        },

        getName(code) {
            return LANG_DATA.full_name[code];
        },

        setActiveLanguage(code) {
            DataStorage.setData('locale', code);
            moment.locale(code);
            _store.dispatch(Loc.setActiveLanguage(code));
        },

        getActiveLanguage(field) {
            const code = (languages.indexOf(DataStorage.getData('locale')) >=0 &&
                    DataStorage.getData('locale')
                )
                || this.getNavigatorLanguage()
                || LANG_EN;

            if (field === LANG_PROP_CODE) {
                return code;
            }

            if (field === undefined) {
                return {
                    [LANG_PROP_CODE]: code,
                    [LANG_PROP_SHORT_NAME]: LANG_DATA.short_name[code],
                    [LANG_PROP_FULL_NAME]: LANG_DATA.full_name[code],
                };
            }

            if (LANG_DATA[field] === undefined) {
                return null;
            }

            return LANG_DATA[field][code];
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
