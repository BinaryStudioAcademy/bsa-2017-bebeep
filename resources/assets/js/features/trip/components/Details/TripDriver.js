import React from 'react';
import {localize} from 'react-localize-redux';
import LangService from 'app/services/LangService';
import * as lang from '../../lang/details/TripDriver.locale.json';

class TripDriver extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    renderAvatar() {
        const driver = this.props.driver;

        if (driver.photo === null) {
            return (<i className="fa fa-3x fa-user-circle-o" aria-hidden="true" />);
        }
        return (<img src={ driver.photo } alt={ driver.full_name } />);
    }

    render() {
        const { driver, translate } = this.props;

        return (
            <section>
                <header>
                    <h3 className="h5">{translate('trip_driver.header')}</h3>
                </header>

                <div className="d-flex">
                    <figure className="driver-image mr-4">
                        { this.renderAvatar() }
                    </figure>

                    <div className="driver-info">
                        <p><strong>{ driver.full_name }</strong></p>
                        <p className="driver-age">
                            { translate('trip_driver.age') }: { driver.age }
                        </p>
                    </div>
                </div>
            </section>
        )
    }
}

export default localize(TripDriver, 'locale');
