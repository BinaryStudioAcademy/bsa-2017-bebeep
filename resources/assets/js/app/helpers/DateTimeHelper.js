import moment from 'moment';
import _ from 'lodash';
import LangService from '../services/LangService';

const DateTimeHelper = {

    /**
     * Get formatted date.
     *
     * Options can be:
     * {
     *     dateFormat  - date format,    default  'ddd DD MMM'
     *     timeFormat  - time format,    default  'H:mm'
     *     onlyDate    - get only date,  default  false
     *     onlyTime    - get only time,  default  false
     *     dayModifier - day modifier (today, tomorrow), default  true
     *                   If onlyDate or onlyTime is true, it may not affect
     * }
     *
     * @param  int timestamp
     * @param  object options
     *
     * @return object { time: <time> }
     *                { date: <date> }
     *                { date: <date|'today'|'tomorrow'>, time: <time> }
     */
    dateFormat(timestamp, options) {
        const defaultOptions = {
            dateFormat: 'ddd DD MMM',
            timeFormat: 'H:mm',
            onlyDate: false,
            onlyTime: false,
            dayModifier: true,
        };
        options = {
            ...defaultOptions,
            ...options,
        };

        const now = moment(),
            date = moment(timestamp * 1000),
            formatDate = _.capitalize(date.format(options.dateFormat)),
            time = date.format(options.timeFormat);

        if (options.onlyTime) {
            return { time };
        }
        if (options.onlyDate) {
            return { date: formatDate };
        }

        if (options.dayModifier) {
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
        }

        return {
            date: formatDate,
            time
        };
    },

    dateFormatLocale(data) {
        const dateFormat = this.dateFormat(data.timestamp),
            getTranslate = data.getTranslate || LangService.translate;

        return dateFormat.date === 'today'
            ? getTranslate('today', { time: dateFormat.time })
            : dateFormat.date === 'tomorrow'
                ? getTranslate('tomorrow', { time: dateFormat.time })
                : `${dateFormat.date} - ${dateFormat.time}`;
    },

    getTimeFromCommentDateForComment(date)
    {
        let momentDate = moment.unix(date);

        if (moment().diff(momentDate, 'days') > 7) {
            return momentDate.format('DD MMMM YYYY');
        }

        return moment().diff(momentDate, 'days');
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

    getTimeForChat(date) {
        return moment.unix(date).format("DD MMM YYYY HH:mm");
    }

};

export default DateTimeHelper;
