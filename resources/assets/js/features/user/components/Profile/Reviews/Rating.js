import React from 'react';
import {localize} from 'react-localize-redux';
import LangService from 'app/services/LangService';
import * as lang from '../../../lang/Profile/Reviews/Rating.locale.json';
import { Progress } from 'reactstrap';

import "../../../styles/rating.scss";

class DriverRating extends React.Component {
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

    render() {
        const { translate, marks } = this.props,
            marksStats = this.countProps(marks);

        return (
            <div className="rating-info">
                <div className="row">
                    <div className="col-sm-6 text-center">
                        <div className="rating-block">
                            <h5>{translate('rating.driver_rating')}</h5>
                            <h2 className="bold padding-bottom-7"><i className="fa fa-star" aria-hidden="true"></i>{marksStats['avg']} <span className="small-text">/ 5</span></h2>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <h5>{translate('rating.driver_rating_breakdown')}</h5>
                        <div className="pull-left">
                            <div className="pull-left rating__marker">
                                <div className="rating-marker">5</div>
                            </div>
                            <div className="pull-left rating__progress">
                                <Progress className="rating-progress" color="success" value={marksStats.byMark[5].percent} />
                            </div>
                            <div className="pull-right rating__count">{marksStats.byMark[5].count}</div>
                        </div>
                        <div className="pull-left">
                            <div className="pull-left rating__marker">
                                <div className="rating-marker">4 </div>
                            </div>
                            <div className="pull-left rating__progress">
                                <Progress className="rating-progress" color="primary" value={marksStats.byMark[4].percent} />
                            </div>
                            <div className="pull-right rating__count">{marksStats.byMark[4].count}</div>
                        </div>
                        <div className="pull-left">
                            <div className="pull-left rating__marker">
                                <div className="rating-marker">3</div>
                            </div>
                            <div className="pull-left rating__progress">
                                <Progress className="rating-progress" color="info" value={marksStats.byMark[3].percent} />
                            </div>
                            <div className="pull-right rating__count">{marksStats.byMark[3].count}</div>
                        </div>
                        <div className="pull-left">
                            <div className="pull-left rating__marker">
                                <div className="rating-marker">2</div>
                            </div>
                            <div className="pull-left rating__progress">
                                <Progress className="rating-progress" color="warning" value={marksStats.byMark[2].percent} />
                            </div>
                            <div className="pull-right rating__count">{marksStats.byMark[2].count}</div>
                        </div>
                        <div className="pull-left">
                            <div className="pull-left rating__marker">
                                <div className="rating-marker">1</div>
                            </div>
                            <div className="pull-left rating__progress">
                                <Progress className="rating-progress" color="danger" value={marksStats.byMark[1].percent} />
                            </div>
                            <div className="pull-right rating__count">{marksStats.byMark[1].count}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default localize(DriverRating, 'locale');
