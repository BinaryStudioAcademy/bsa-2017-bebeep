import DataStorage from 'app/helpers/DataStorage';

import { setCurrencies, setActiveCurrency } from '../actions';

export const CURRENCY_USD = 'USD';
export const CURRENCY_UAH = 'UAH';
export const CURRENCY_EUR = 'EUR';

export const CURRENCY_PROP_CODE = 'code';
export const CURRENCY_PROP_SIGN = 'sign';

const CURRENCY_STORAGE_KEY = 'currency';

const CURRENCY_DATA = {
    [CURRENCY_PROP_SIGN]: {
        [CURRENCY_USD]: "\u0024",
        [CURRENCY_UAH]: "\u20B4",
        [CURRENCY_EUR]: "\u20AC",
    },
    rate: {
        [CURRENCY_USD]: 1,
        [CURRENCY_UAH]: 26.14,
        [CURRENCY_EUR]: 0.83,
    },
    isMain:{
        [CURRENCY_USD]: true,
        [CURRENCY_UAH]: false,
        [CURRENCY_EUR]: false,
    }
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

        getActiveCurrencyCode() {
            return this.getActiveCurrency(CURRENCY_PROP_CODE);
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
                    [CURRENCY_PROP_SIGN]: CURRENCY_DATA.sign[code],
                    rate:CURRENCY_DATA.rate[code],
                    isMain: CURRENCY_DATA.isMain[code],
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
        convert(data) {
            const activeCurrency = this.getActiveCurrency();
            if (data.currency.code === activeCurrency.code){
                return data;
            }

            if(data.currency.is_main){
                data.value = (data.value * activeCurrency.rate).toFixed(2);
                data.currency = activeCurrency;
                console.log(data,1);
                return data;
            }

            const convertToDollar = data.value/data.currency.rate;
            if (activeCurrency.isMain ){
                data.value = convertToDollar.toFixed(2);
                data.currency = activeCurrency;
                console.log(data,2);
                return data;
            }

            data.value = (convertToDollar*activeCurrency.rate).toFixed(2);
            data.currency = activeCurrency;
            console.log(data);
            return data;
        },
    };
})();

export default CurrencyService;
