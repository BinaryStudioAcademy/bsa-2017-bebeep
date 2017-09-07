export const getCityLocation = (location) => {
    return _.reduce(location.address_components, (result, address) => {
        if (address.types.indexOf('locality') >= 0) {
            return address.short_name;
        } else {
            return result;
        }
    }, '')
};