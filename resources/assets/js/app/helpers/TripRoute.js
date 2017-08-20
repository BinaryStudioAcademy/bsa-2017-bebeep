import * as moment from 'moment';

export default class TripRoute {
    constructor(route) {
        this.route = route;
        this.distance = 0;
        this.duration = 0;

        this.calculateDistanceAndDuration();
    }

    getRoute() {
        return this.route;
    }

    getStartPoint() {
        return this.route.legs[0];
    }

    getEndPoint() {
        return this.route.legs[this.route.legs.length - 1];
    }

    getDistanceRaw() {
        return this.distance;
    }

    getDistance() {
        return (this.distance / 1000).toFixed(1) + " km";
    }

    getDurationRaw() {
        return this.duration;
    }

    getDuration() {
        return moment.duration(this.duration, 'seconds').humanize();
    }

    calculateDistanceAndDuration() {
        this.route.legs.forEach((leg) => {
            this.distance += leg.distance.value;
            this.duration += leg.duration.value;
        });
    }
}