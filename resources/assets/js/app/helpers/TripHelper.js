export const getCityLocation = (location) => {
    const city = _.reduce(location.address_components, (result, address) => {
        if (address.types.indexOf('locality') >= 0) {
            return address.short_name;
        } else {
            return result;
        }
    }, '');

    return city || location.formatted_address || '';
};
