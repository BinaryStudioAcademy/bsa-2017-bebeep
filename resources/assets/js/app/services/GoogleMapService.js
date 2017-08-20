export const getCoordinatesFromPlace = (place) => {
    if (!place) {
        return {lat: 0, lng: 0};
    }

    return {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
    };
};

export const getWaypointsFromRoutes = (routes, forMap = true) => {
    let result = [];

    if (routes.length <= 1) {
        return result;
    }

    routes.forEach((route, index) => {
        if (index >= routes.length - 1) {
            return;
        }

        if (forMap) {
            result.push({location: route.to.geometry.location, stopover: true});
        } else {
            result.push(route.to);
        }
    });

    return result;
};

export const convertWaypointsToGoogleWaypoints = (waypoints) => {
    let result = [];

    waypoints.forEach((waypoint) => {
        if (!waypoint.place) {
            return;
        }

        let lat = waypoint.place.geometry.location.lat;
        let lng = waypoint.place.geometry.location.lng;

        result.push({
            location: {
                lat: typeof lat === 'function' ? lat() : lat,
                lng: typeof lng === 'function' ? lng() : lng,
            },
            stopover: true
        });
    });

    return result;
};