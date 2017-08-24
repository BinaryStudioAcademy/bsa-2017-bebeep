import React from 'react';
import { localize } from 'react-localize-redux';

class TripPassengersList extends React.Component {

    render() {
        const { translate } = this.props;

        return (
            <div className="trip-passengers p-3">
                <span className="trip-text-label d-block">
                    { translate('trip_details.passengers_list.header') }
                </span>

                <ul className="d-flex flex-wrap justify-content-center list-unstyled mt-3">
                    <li className="trip-passenger__item">
                        <img className="trip-passenger" alt="Юрій К (46 р.)" src="https://d1ovtcjitiy70m.cloudfront.net/vi-1/images/avatar/passenger-male-36.png" />
                    </li>
                    <li className="trip-passenger__item">
                        <img className="trip-passenger" alt="Юрій К (46 р.)" src="https://d2kwny77wxvuie.cloudfront.net/user/HYg3XtbNS-aOMm3w4AP1cg/thumbnail_36x36.jpeg" />
                    </li>
                    <li className="trip-passenger__item">
                        <img className="trip-passenger" alt="Юрій К (46 р.)" src="https://d2kwny77wxvuie.cloudfront.net/user/uARSfObaTUqzHDbX_4OBpQ/thumbnail_36x36.jpeg" />
                    </li>
                    <li className="trip-passenger__item">
                        <img className="trip-passenger" alt="Юрій К (46 р.)" src="https://d1ovtcjitiy70m.cloudfront.net/vi-1/images/avatar/passenger-female-36.png" />
                    </li>
                    <li className="trip-passenger__item">
                        <span className="trip-passenger trip-passenger--free" />
                    </li>
                    <li className="trip-passenger__item">
                        <span className="trip-passenger trip-passenger--free" />
                    </li>
                </ul>
            </div>
        )
    }
}

export default localize(TripPassengersList, 'locale');
