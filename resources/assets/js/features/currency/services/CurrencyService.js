import _ from 'lodash';

import DataStorage from 'app/helpers/DataStorage';
import { getCurrencies, setActiveCurrency } from '../actions';

const CURRENCY_DEFAULT = 'USD';
const CURRENCY_STORAGE_KEY = 'currency';

const CurrencyService = (() => {

    let _store = null;

    return {
        init(store) {
            _store = store;

            this.getData();
        },

        get currencies() {
            return _store.getState().currency.currencies;
        },

        getData() {
            const _this = this;

            _store.dispatch(getCurrencies())
                .then(response => {
                    _store.dispatch(setActiveCurrency(
                        _this.getActiveCurrency()
                    ));
                })
                .catch(error => {});
        },

        getCurrencyById(id) {
            if (!id) {
                return null;
            }

            return _.find(this.currencies, currency => {
                return currency.id === id;
            });
        },

        getCurrencyByCode(code) {
            code = code || CURRENCY_DEFAULT;

            return _.find(this.currencies, currency => {
                return currency.code === code;
            });
        },

        getActiveCurrency() {
            if (!this.isCurrenciesExists()) {
                return null;
            }

            let activeCurrency = _store.getState().currency.activeCurrency;

            if (!_.isEmpty(activeCurrency)) {
                return activeCurrency;
            }

            const code = DataStorage.getData(CURRENCY_STORAGE_KEY);
            activeCurrency = this.getCurrencyByCode(code);

            if (activeCurrency === undefined) {
                activeCurrency = this.getCurrencyByCode(CURRENCY_DEFAULT);
            }

            return activeCurrency;
        },

        setActiveCurrency(code) {
            DataStorage.setData(CURRENCY_STORAGE_KEY, code);

            _store.dispatch(setActiveCurrency(
                this.getCurrencyByCode(code)
            ));
        },

        isCurrenciesExists() {
            return !!this.currencies.length;
        },

        convertValue(value, currency) {
            const activeCurrency = this.getActiveCurrency();

            if (currency.code === activeCurrency.code){
                return value;
            }

            if (currency.is_main) {
                return Math.round(value * activeCurrency.rate);
            }

            const convertToDollar = value / currency.rate;

            if (activeCurrency.isMain) {
                return Math.round(convertToDollar);
            }

            return Math.round(convertToDollar * activeCurrency.rate);
        },
    };
})();

export default CurrencyService;
