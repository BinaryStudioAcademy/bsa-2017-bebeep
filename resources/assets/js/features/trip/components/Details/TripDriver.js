import React from 'react';
import {localize} from 'react-localize-redux';
import LangService from 'app/services/LangService';
import * as lang from '../../lang/details/TripDriver.locale.json';

class TripDriver extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const { driver, translate } = this.props;

        return (
            <section>
                <header>
                    <h3>{translate('trip_driver.header')}</h3>
                </header>

                <div className="d-flex">
                    <figure className="driver-image">
                        <img src="/" alt={ driver.full_name } />
                    </figure>

                    <div className="driver-info">
                        <h4>{ driver.full_name }</h4>
                        <p className="driver-age">25 {translate('trip_driver.age')}</p>
                    </div>
                </div>
            </section>
        )
    }
}

export default localize(TripDriver, 'locale');
