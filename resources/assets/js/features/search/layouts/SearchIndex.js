import React from 'react';
import { connect } from 'react-redux';
import { localize } from 'react-localize-redux';

import SearchForm from '../components/Index/SearchForm';
import WizardTrip from 'features/wizard-trip/layouts/WizardTrip';
import WizardTab from 'features/wizard-trip/components/WizardTab';

import { USER_ROLE_PASSENGER, USER_ROLE_DRIVER, checkDriverRole } from 'app/services/UserService';

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
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ isDriverModeAvailable: this.isDriverModeAvailable(nextProps) });
    }

    isPassengerMode() {
        return this.state.mode === USER_ROLE_PASSENGER;
    }

    isDriverMode() {
        return this.state.mode === USER_ROLE_DRIVER;
    }

    isDriverModeAvailable(props) {
        const { isAuthorized, sessionPermissions } = props;

        if (!isAuthorized) {
            return true;
        }
        return checkDriverRole(sessionPermissions);
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
            //isDriverModeAvailable = this.isDriverModeAvailable();

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
            <section className="home-slider">
                { this.renderWizardTabs() }

                <div className="home-slider__search wizard-form">
                    { this.renderFormHeader() }
                    { this.renderFormContent() }
                </div>
            </section>
        );
    }
}

const SearchIndexConnected = connect(
    state => ({
        isAuthorized: state.user.session.isAuthorized,
        sessionPermissions: state.user.session.permissions,
    }),
    null,
)(SearchIndex);

export default localize(SearchIndexConnected, 'locale');
