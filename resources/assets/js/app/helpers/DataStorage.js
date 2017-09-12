/**
 * Data storage helper.
 */
const DataStorage = (() => {

    let _this = null,
        _storage = null;

    return {
        init() {
            _this = this;
            _storage = window.localStorage;
        },

        getSize() {
            return _storage.length;
        },

        setData(key, value) {
            _storage.setItem(key, value);
        },

        getData(key) {
            return _storage.getItem(key);
        },

        removeData(key) {
            _storage.removeItem(key);
        },

        clear() {
            _storage.clear();
        },
    };
})();

export default DataStorage;
