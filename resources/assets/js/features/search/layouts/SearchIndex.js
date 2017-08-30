import React from 'react';

import PageHeader from 'app/components/PageHeader';
import SearchForm from '../components/Index/SearchForm';
import LangService from 'app/services/LangService';
import * as lang from '../lang/SearchIndex.locale.json';
import {localize} from 'react-localize-redux';
import WizardTrip from 'features/wizard-trip/layouts/WizardTrip'

export default localize(class SearchIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: 'passenger'
        };
    }

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {translate} = this.props;
        return (
            <div>
                <section className="home-slider">
                    <div className="home-slider__tabs wizard-tabs">
                        <a href="#" onClick={() => {this.setState({mode: 'passenger'})}}
                           className={'wizard-tabs__tab ' + (this.state.mode === 'passenger' ? 'wizard-tabs__tab_active' : '')}
                        >
                            <img src="/template/img/welcome-icon1.png" alt=""/>
                                <span>{translate('search_index.i_am_passenger')}</span>
                        </a>
                        <a href="#" onClick={() => {this.setState({mode: 'driver'})}}
                           className={'wizard-tabs__tab ' + (this.state.mode !== 'passenger' ? 'wizard-tabs__tab_active' : '')}
                        >
                            <img src="/template/img/welcome-icon2.png" alt=""/>
                                <span>{translate('search_index.i_am_driver')}</span>
                        </a>
                    </div>

                    <div className="home-slider__search wizard-form">
                        <h2 className="wizard-form__header">
                            {this.state.mode === 'passenger' ? translate('search_index.find_cheap_ride') : translate('search_index.find_cheap_ride_driver')}
                        </h2>

                        {this.state.mode === 'passenger' ? (
                            <SearchForm pageType="index" />
                        ) : (<WizardTrip />)}
                    </div>
                </section>
            </div>
        );
    }
}, 'locale');
