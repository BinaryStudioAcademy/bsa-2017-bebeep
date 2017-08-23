import React from 'react';
import {localize} from 'react-localize-redux';

import "../styles/driver-profile.scss";

class DriverProfile extends React.Component {

    render() {
        const { translate } = this.props;

        return (
            <div className="driver-profile">
                <div className="text-center">
                    <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRbezqZpEuwGSvitKy3wrwnth5kysKdRqBW54cAszm_wiutku3R"
                        width="150" height="150" border="0" className="rounded-circle driver-avatar" />
                    <h4 className="m-y-2">Name Surname, <span className="driver-years">41 y</span></h4>
                    <strong>Досвід: </strong> досвідчений <br/>
                    <strong>Рейтинг: </strong> досвідчений <br/>
                    <strong>Вподобання: </strong> досвідчений <br/>
                </div>
                <div className="text-center">
                    <p className="text-left"><strong>Про себе: </strong><br/>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sem dui, tempor sit amet commodo a, vulputate vel tellus.</p>
                </div>
                <hr/>
                <div className="text-center">
                    <p className="text-left"><strong>Коментарі: </strong><br/>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sem dui, tempor sit amet commodo a, vulputate vel tellus.</p>
                    <br />
                </div>
            </div>
        );
    }
}

export default localize(DriverProfile, 'locale');
