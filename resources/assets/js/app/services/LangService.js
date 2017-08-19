import * as Loc from 'react-localize-redux';

const LangService = (() => {
    let _store = null;
    let storage =  localStorage;
    const languages = ['en', 'ua', 'ru'];
    return {
        init(store) {
            _store = store;
            _store.dispatch(Loc.setLanguages(this.languages, this.getActiveLanguage() || 'en'));
        },
        get languages() {
            return languages;
        },
        setActiveLanguage(code) {
            storage.setItem('locale', code);
            _store.dispatch(Loc.setActiveLanguage(code))
        },
        getActiveLanguage() {
            return storage['locale'];
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