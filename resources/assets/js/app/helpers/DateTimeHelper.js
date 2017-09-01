import moment from 'moment';
import _ from 'lodash';

const DateTimeHelper = {

    dateFormat(timestamp) {
        const date = moment(timestamp * 1000),
            now = moment(),
            formatDate = _.capitalize(date.format('ddd DD MMM')),
            time = date.format('H:mm');

        if (now.isSame(date, 'day')) {
            return {
                date: 'today',
                time
            };
        }

        if (now.isSame(date.subtract(1, 'day'), 'day')) {
            return {
                date: 'tomorrow',
                time
            };
        }

        return {
            date: formatDate,
            time
        };
    },

    dateFormatLocale(data) {
        const dateFormat = this.dateFormat(data.timestamp),
            getTranslate = data.getTranslate;

        return dateFormat.date === 'today'
            ? getTranslate('today', { time: dateFormat.time })
            : dateFormat.date === 'tomorrow'
                ? getTranslate('tomorrow', { time: dateFormat.time })
                : `${dateFormat.date} - ${dateFormat.time}`;
    },

    getTimeFromCommentDate(date) {
        if (moment().diff(date, 'days') > 7) {
            return moment(date).format('DD MMMM YYYY');
        }

        return moment().diff(date, 'days');
    },

    getUserYearsOld(date) {
        return moment().diff(date, 'years');
    },

};

export default DateTimeHelper;
