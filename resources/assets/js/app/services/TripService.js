import Validator from './Validator';
import moment from 'moment';
import LangService from './LangService';

export const createTripRules = () => ({
    vehicle_id: Validator.required(LangService.translate('validate.please_select_a_car')),
    start_at: Validator.required(LangService.translate('validate.please_enter_trip_start_time')),
    end_at: Validator.required(LangService.translate('validate.please_enter_trip_end_time')),
    from: Validator.required(LangService.translate('validate.enter_trip_start_point')),
    to: Validator.required(LangService.translate('validate.enter_trip_end_point')),
    price: [
        Validator.required(LangService.translate('validate.enter_trip_price')),
        Validator.greaterThan(1, LangService.translate('validate.trip_price_must_be_greater_than_0'))
    ],
    seats: [
        Validator.required(LangService.translate('validate.enter_trip_seats')),
        Validator.greaterThan(1, LangService.translate('validate.trip_seats_must_be_greater_than_0'))
    ]
});

export const getStartAndEndTime = (start_at, duration) => {
    if (!start_at) {
        return {
            start_at: null,
            end_at: null
        }
    }

    start_at = moment(start_at).unix();
    let end_at = start_at + duration;

    return {
        start_at: start_at,
        end_at: end_at
    }
};
