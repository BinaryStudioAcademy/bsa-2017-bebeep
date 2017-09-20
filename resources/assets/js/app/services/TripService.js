import moment from 'moment';
import Validator from './Validator';
import LangService from './LangService';
import CurrencyService from 'features/currency/services/CurrencyService';
import _ from 'lodash';

export const createTripRules = () => ({
    vehicle_id: Validator.required(LangService.translate('validate.please_select_a_car')),
    start_at: Validator.required(LangService.translate('validate.please_enter_trip_start_time')),
    end_at: Validator.required(LangService.translate('validate.please_enter_trip_end_time')),
    from: Validator.required(LangService.translate('validate.enter_trip_start_point')),
    to: Validator.required(LangService.translate('validate.enter_trip_end_point')),
    price: [
        Validator.required(LangService.translate('validate.enter_trip_price')),
        Validator.greaterThan(1, LangService.translate('validate.trip_price_must_be_greater_than_0')),
    ],
    seats: [
        Validator.required(LangService.translate('validate.enter_trip_seats')),
        Validator.greaterThan(1, LangService.translate('validate.trip_seats_must_be_greater_than_0')),
    ],
});

export const getStartAndEndTime = (startAt, duration) => {
    if (!startAt) {
        return {
            start_at: null,
            end_at: null,
        }
    }

    if (isNaN(startAt)) {
        startAt = moment(startAt).unix();
    }

    const endAt = startAt + duration;

    return {
        start_at: startAt,
        end_at: endAt,
    };
};

export const getRoutesStartAndEndTime = (tripStartAt, durations) => {
    let startAt = tripStartAt;

    return durations.map((duration) => {
        const waypointTimes = getStartAndEndTime(startAt, duration);

        startAt = waypointTimes.end_at;

        return waypointTimes;
    });
};

export const convertTripPrice = (trip) => {
    const currency = CurrencyService.getCurrencyById(trip.currency_id);

    return CurrencyService.convertValue(trip.price, currency);
}

export const convertTripRoutesPrice = (currencyId, routes) => {
    const currency = CurrencyService.getCurrencyById(currencyId),
        tripRoutes = _.cloneDeep(routes);

    return tripRoutes.map((route) => {
        route.price = CurrencyService.convertValue(route.price, currency);

        return route;
    });
}
