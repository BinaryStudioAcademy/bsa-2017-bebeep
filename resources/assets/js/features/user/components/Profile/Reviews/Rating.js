import React from 'react';
import {localize} from 'react-localize-redux';
import LangService from 'app/services/LangService';
import * as lang from '../../../lang/Profile/Reviews/Rating.locale.json';
import { Progress } from 'reactstrap';

import "../../../styles/rating.scss";

class Rating extends React.Component {
    componentWillMount() {
        LangService.addTranslation(lang);
    }

    countProps(marks) {
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
    }

    getMarks(marks) {
        const marksInfo = this.countProps(marks);
        return {
            get avg() {
                return marksInfo['avg'];
            },
            getPercent(mark) {
                return marksInfo.byMark[mark] ? marksInfo.byMark[mark].percent : 0;
            },
            getCount(mark) {
                return marksInfo.byMark[mark] ? marksInfo.byMark[mark].count : 0;
            }
        };
    }

    render() {
        const { translate, marks } = this.props,
            marksStats = this.getMarks(marks);
        console.log(marksStats.getPercent(5));
        return (
            <div className="rating-info">
                <div className="row">
                    <div className="col-sm-6 text-center">
                        <div className="rating-block">
                            <h5>{translate('rating.driver_rating')}</h5>
                            <h2 className="bold padding-bottom-7"><i className="fa fa-star" aria-hidden="true"></i>{marksStats.avg} <span className="small-text">/ 5</span></h2>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <h5>{translate('rating.driver_rating_breakdown')}</h5>
                        <div className="pull-left">
                            <div className="pull-left rating__marker">
                                <div className="rating-marker">5</div>
                            </div>
                            <div className="pull-left rating__progress">
                                <Progress className="rating-progress" color="success" value={marksStats.getPercent(5)} />
                            </div>
                            <div className="pull-right rating__count">{marksStats.getCount(5)}</div>
                        </div>
                        <div className="pull-left">
                            <div className="pull-left rating__marker">
                                <div className="rating-marker">4 </div>
                            </div>
                            <div className="pull-left rating__progress">
                                <Progress className="rating-progress" color="primary" value={marksStats.getPercent(4)} />
                            </div>
                            <div className="pull-right rating__count">{marksStats.getCount(4)}</div>
                        </div>
                        <div className="pull-left">
                            <div className="pull-left rating__marker">
                                <div className="rating-marker">3</div>
                            </div>
                            <div className="pull-left rating__progress">
                                <Progress className="rating-progress" color="info" value={marksStats.getPercent(3)} />
                            </div>
                            <div className="pull-right rating__count">{marksStats.getCount(3)}</div>
                        </div>
                        <div className="pull-left">
                            <div className="pull-left rating__marker">
                                <div className="rating-marker">2</div>
                            </div>
                            <div className="pull-left rating__progress">
                                <Progress className="rating-progress" color="warning" value={marksStats.getPercent(2)} />
                            </div>
                            <div className="pull-right rating__count">{marksStats.getCount(2)}</div>
                        </div>
                        <div className="pull-left">
                            <div className="pull-left rating__marker">
                                <div className="rating-marker">1</div>
                            </div>
                            <div className="pull-left rating__progress">
                                <Progress className="rating-progress" color="danger" value={marksStats.getPercent(1)} />
                            </div>
                            <div className="pull-right rating__count">{marksStats.getCount(1)}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default localize(Rating, 'locale');
