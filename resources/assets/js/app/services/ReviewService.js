import {securedRequest} from './RequestService';

export const fetchGiven = () => {
    return securedRequest.get('/api/v1/reviews/given');
};

export const fetchReceived = () => {
    return securedRequest.get('/api/v1/reviews/received');
};

export const calcRatingData = (marks) => {
    const maxMark = _.max(marks);
    let info = _.reduce(marks, (marks, mark, i) => {
        marks['byMark'][i + 1] = {
            percent: 100 * mark / maxMark,
            count: mark
        };
        marks['sum'] += mark * (i + 1);
        marks['count'] += mark;
        return marks;
    }, {
        sum: 0,
        count: 0,
        byMark: {}
    });
    const avg = parseInt(info.sum / info.count * 100) / 100;
    info['avg'] = isNaN(avg) ? 0 : avg;
    return info;
};

export const getRatingStats = (marks) => {
    const ratingInfo = calcRatingData(marks);

    return {
        get avg() {
            return ratingInfo['avg'];
        },
        getPercent(mark) {
            return ratingInfo.byMark[mark] ? ratingInfo.byMark[mark].percent : 0;
        },
        getCount(mark) {
            return ratingInfo.byMark[mark] ? ratingInfo.byMark[mark].count : 0;
        }
    };
};
