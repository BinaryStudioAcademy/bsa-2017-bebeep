import moment from 'moment';

export const dateFormat = (timestamp) => {
    const date = moment(timestamp * 1000),
        now = moment(),
        formatDate = _.capitalize(date.format('ddd DD MMM')),
        time = date.format('H:mm');

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
        date: formatDate,
        time
    };
};

export const getTimeFromDate = (date, get) => {
    return moment().diff(date, get);
};

const DateTimeHelper = {
    dateFormat,
    getTimeFromDate
};

export default DateTimeHelper;
