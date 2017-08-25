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

export const getTimeFromCommentDate = (date) => {
    if(moment().diff(date, 'days') > 7) {
        return moment(date).format('DD MMMM YYYY');
    } else {
        return moment().diff(date, 'days');
    }
};

export const getUserYearsOld = (date) => {
    return moment().diff(date, 'years');
};

const DateTimeHelper = {
    dateFormat,
    getTimeFromCommentDate,
    getUserYearsOld
};

export default DateTimeHelper;
