import moment from 'moment';

export const dateFormat = (timestamp) => {
    const date = moment(timestamp * 1000),
        locale = moment().locale(),
        localeData = moment().locale(locale).localeData(),
        day = _.padStart(date.date(), 2, '0'),
        weekday = _.capitalize(localeData.weekdaysShort(date)),
        month = _.capitalize(localeData.monthsShort(date)),
        minute = _.padStart(date.minute(), 2, '0'),
        hour = _.padStart(date.hour(), 2, '0'),
        now = moment(),
        time = `${hour}:${minute}`;
    if (now.isSame(date, 'day')) {
        return {
            date: 'today',
            time
        };
    } else if (now.isSame(date.subtract(1, 'day'), 'day')) {
        return {
            date: 'tomorrow',
            time
        };
    }
    return {
        date: `${weekday}. ${day} ${month}`,
        time
    };
};

const DateService = {
    dateFormat
};

export default DateService;
