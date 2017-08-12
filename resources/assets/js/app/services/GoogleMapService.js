export const getCoordinatesFromPlace = (place) => {
    if (!place) {
        return {lat: 0, lng: 0};
    }

    return {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
    };
};
