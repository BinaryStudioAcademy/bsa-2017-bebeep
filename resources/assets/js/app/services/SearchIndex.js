import Validator from './Validator';
import LangService from './LangService';

export const searchIndexRules = () => ({
    from: Validator.required(LangService.translate('validate.please_select_leaving_from_point')),
    to: Validator.required(LangService.translate('validate.please_select_going_to_point')),
    start_at: Validator.required(LangService.translate('validate.please_select_ride_date'))
});