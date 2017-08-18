export const getCoordinatesFromPlace = (place) => {
    if (!place) {
        return {lat: 0, lng: 0};
    }

    return {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
    };
};

export const convertWaypointsToGoogleWaypoints = (waypoints) => {
    let result = [];

    waypoints.forEach((waypoint) => {
        if (!waypoint.place) {
            return;
        }

        result.push({
            location: {
                lat: waypoint.place.geometry.location.lat(),
                lng: waypoint.place.geometry.location.lng()
            },
            stopover: true
        });
    });

    return result;
};