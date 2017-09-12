import React from 'react';
import { connect } from 'react-redux';
import { localize } from 'react-localize-redux';

import SearchForm from '../components/Index/SearchForm';

import WizardTrip from 'features/wizard-trip/layouts/WizardTrip';
import WizardTab from 'features/wizard-trip/components/WizardTab';
import MainPageContent from './MainPageContent';

import AuthService from 'app/services/AuthService';
import { USER_ROLE_PASSENGER, USER_ROLE_DRIVER } from 'app/services/UserService';

import LangService from 'app/services/LangService';
import * as lang from '../lang/SearchIndex.locale.json';

class SearchIndex extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            mode: USER_ROLE_PASSENGER,
            isDriverModeAvailable: true,
        };

        this.setPassengerMode = this.setPassengerMode.bind(this);
        this.setDriverMode = this.setDriverMode.bind(this);
    }

    componentWillMount() {
        LangService.addTranslation(lang);
        this.setState({ isDriverModeAvailable: this.isDriverModeAvailable() });
    }

    isPassengerMode() {
        return this.state.mode === USER_ROLE_PASSENGER;
    }

    isDriverMode() {
        return this.state.mode === USER_ROLE_DRIVER;
    }

    isDriverModeAvailable() {
        if (! AuthService.isAuthorized()) {
            return true;
        }
        return AuthService.checkPermissions(USER_ROLE_DRIVER);
    }

    setPassengerMode(e) {
        e.preventDefault();

        this.setState({ mode: USER_ROLE_PASSENGER });
    }

    setDriverMode(e) {
        e.preventDefault();

        if (this.state.isDriverModeAvailable) {
            this.setState({ mode: USER_ROLE_DRIVER });
        }
    }

    renderWizardTabs() {
        const { translate } = this.props,
            { isDriverModeAvailable } = this.state;

        return (
            <div className="home-slider__tabs wizard-tabs">
                <WizardTab
                    isActive={this.isPassengerMode()}
                    image="/template/img/welcome-icon1.png"
                    title={translate('search_index.i_am_passenger')}
                    onClick={this.setPassengerMode}
                />
                <WizardTab
                    isShow={isDriverModeAvailable}
                    isActive={this.isDriverMode()}
                    image="/template/img/welcome-icon2.png"
                    title={translate('search_index.i_am_driver')}
                    onClick={this.setDriverMode}
                />
            </div>
        );
    }

    renderFormHeader() {
        const { translate } = this.props,
            header = translate(
                this.isPassengerMode()
                ? 'search_index.find_cheap_ride'
                : 'search_index.find_cheap_ride_driver'
            );

        return (
            <h2 className="wizard-form__header">{ header }</h2>
        );
    }

    renderFormContent() {
        return this.isPassengerMode()
            ? <SearchForm pageType="index" />
            : <WizardTrip />;
    }

    render() {
        const { translate } = this.props;

        return (
            <div>
                <section className="home-slider">
                    { this.renderWizardTabs() }

                    <div className="home-slider__search wizard-form">
                        { this.renderFormHeader() }
                        { this.renderFormContent() }
                    </div>
                </section>

                <MainPageContent />
            </div>
        );
    }
}

export default localize(SearchIndex, 'locale');
