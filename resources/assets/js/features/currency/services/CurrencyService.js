import DataStorage from 'app/helpers/DataStorage';

import { setCurrencies, setActiveCurrency } from '../actions';

export const CURRENCY_USD = 'USD';
export const CURRENCY_UAH = 'UAH';
export const CURRENCY_EUR = 'EUR';

export const CURRENCY_PROP_CODE = 'code';
export const CURRENCY_PROP_SHORT_NAME = 'short_name';
export const CURRENCY_PROP_FULL_NAME = 'full_name';

const CURRENCY_STORAGE_KEY = 'currency';

const CURRENCY_DATA = {
    [CURRENCY_PROP_SHORT_NAME]: {
        [CURRENCY_USD]: "\u0024",
        [CURRENCY_UAH]: "\u20B4",
        [CURRENCY_EUR]: "\u20AC",
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

            _store.dispatch(setCurrencies({
                currencies: this.currencies,
                activeCurrency: this.getActiveCurrency(CURRENCY_PROP_CODE),
            }));
        },

        get currencies() {
            return currencies;
        },

        getName(code) {
            return CURRENCY_DATA.full_name[code];
        },

        getActiveCurrency(prop) {
            const code = (this.currencies.indexOf(DataStorage.getData(CURRENCY_STORAGE_KEY)) !== -1 &&
                    DataStorage.getData(CURRENCY_STORAGE_KEY)
                )
                || CURRENCY_USD;

            if (prop === CURRENCY_PROP_CODE) {
                return code;
            }

            if (prop === undefined) {
                return {
                    [CURRENCY_PROP_CODE]: code,
                    [CURRENCY_PROP_SHORT_NAME]: CURRENCY_DATA.short_name[code],
                    [CURRENCY_PROP_FULL_NAME]: CURRENCY_DATA.full_name[code],
                };
            }

            if (CURRENCY_DATA[prop] === undefined) {
                return null;
            }

            return CURRENCY_DATA[prop][code];
        },

        setActiveCurrency(code) {
            DataStorage.setData(CURRENCY_STORAGE_KEY, code);
            _store.dispatch(setActiveCurrency(code));
        },
    };
})();

export default CurrencyService;
