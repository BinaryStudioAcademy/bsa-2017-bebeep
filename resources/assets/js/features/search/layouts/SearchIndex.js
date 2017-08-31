import React from 'react';

import PageHeader from 'app/components/PageHeader';
import SearchForm from '../components/Index/SearchForm';
import LangService from 'app/services/LangService';
import * as lang from '../lang/SearchIndex.locale.json';
import {localize} from 'react-localize-redux';
import WizardTrip from 'features/wizard-trip/layouts/WizardTrip'

export const MODE_PASSENGER = 'passenger';
export const MODE_DRIVER = 'driver';

export default localize(class SearchIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: MODE_PASSENGER
        };
    }

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    isPassengerMode() {
        return this.state.mode === MODE_PASSENGER;
    }

    isDriverMode() {
        return this.state.mode === MODE_DRIVER;
    }

    render() {
        const {translate} = this.props;
        return (
            <div>
                <section className="home-slider">
                    <div className="home-slider__tabs wizard-tabs">
                        <a href="#" onClick={() => {this.setState({mode: 'passenger'})}}
                           className={'wizard-tabs__tab ' + (this.isPassengerMode() ? 'wizard-tabs__tab_active' : '')}
                        >
                            <img src="/template/img/welcome-icon1.png" alt=""/>
                                <span>{translate('search_index.i_am_passenger')}</span>
                        </a>
                        <a href="#" onClick={() => {this.setState({mode: 'driver'})}}
                           className={'wizard-tabs__tab ' + (this.isDriverMode() ? 'wizard-tabs__tab_active' : '')}
                        >
                            <img src="/template/img/welcome-icon2.png" alt=""/>
                                <span>{translate('search_index.i_am_driver')}</span>
                        </a>
                    </div>

                    <div className="home-slider__search wizard-form">
                        <h2 className="wizard-form__header">
                            {this.isPassengerMode() ? translate('search_index.find_cheap_ride') : translate('search_index.find_cheap_ride_driver')}
                        </h2>

                        {this.isPassengerMode() ? (
                            <SearchForm pageType="index" />
                        ) : (<WizardTrip />)}
                    </div>
                </section>
            </div>
        );
    }
}, 'locale');
