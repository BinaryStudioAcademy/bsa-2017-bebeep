import DataStorage from '../helpers/DataStorage';

import { setCurrencies, setActiveCurrence } from '../actions';

export const CURRENCY_USD = 'USD';
export const CURRENCY_UAH = 'UAH';
export const CURRENCY_EUR = 'EUR';

export const CURRENCY_PROP_CODE = 'code';
export const CURRENCY_PROP_SHORT_NAME = 'short_name';
export const CURRENCY_PROP_FULL_NAME = 'full_name';

const CURRENCY_STORAGE_KEY = 'currency';

const CURRENCY_DATA = {
    [CURRENCY_PROP_SHORT_NAME]: {
        [CURRENCY_USD]: 'USD',
        [CURRENCY_UAH]: 'UAH',
        [CURRENCY_EUR]: 'EUR',
    },
    [CURRENCY_PROP_FULL_NAME]: {
        [CURRENCY_USD]: 'Долар',
        [CURRENCY_UAH]: 'Гривня',
        [CURRENCY_EUR]: 'Євро',
    },
};

const CurrencyService = (() => {

    const currencies = [CURRENCY_USD, CURRENCY_UAH, CURRENCY_EUR];
    let _store = null;

    return {
        init(store) {
            _store = store;

            /*_store.dispatch(Loc.setLanguages(
                this.languages, this.getActiveLanguage(CURRENCY_PROP_CODE)
            ));*/
        },

        get currencies() {
            return currencies;
        },

        getName(code) {
            return CURRENCY_DATA.full_name[code];
        },
    };
})();

export default CurrencyService;
