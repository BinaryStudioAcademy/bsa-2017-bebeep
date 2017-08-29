import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { localize } from 'react-localize-redux';

import Preloader from 'app/components/Preloader';
import PageHeader from 'app/components/PageHeader';
import GeneralForm from 'features/user/components/Profile/GeneralForm';

import UserService from 'features/user/services/UserService';
import { userProfileSetState, updateProfileSuccess } from 'features/user/actions';

import LangService from 'app/services/LangService';
import * as lang from 'features/user/lang/Profile/ProfileGeneral.locale.json';

class ProfileGeneral extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            preloader: true,
            notFoundOrError: false,
        };
    }

    componentDidMount() {
        const { userProfileSetState } = this.props;

        UserService.getProfileGeneral()
            .then(response => {
                userProfileSetState(response);

                this.setState({
                    preloader: false,
                });
            })
            .catch(error => {
                this.setState({
                    preloader: false,
                    notFoundOrError: true,
                });
            });
    }

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    renderContent() {
        const { profile, updateProfileSuccess, translate } = this.props,
            { preloader, notFoundOrError } = this.state;

        if (preloader) {
            return (<Preloader enable={true} />);
        }

        if (notFoundOrError) {
            return (
                <div className="alert alert-danger" role="alert">
                    { translate('profile_general.profile_data_not_found_or_error') }
                </div>
            );
        }

        return (
            <GeneralForm
                profile={profile}
                updateProfileSuccess={updateProfileSuccess}
            />
        );
    }

    render() {
        const { translate } = this.props;

        return (
            <div>
                <PageHeader header={ translate('profile_general.personal_information') } />
                { this.renderContent() }
            </div>
        );
    }
}

const ProfileGeneralConnected = connect(
    state => ({
        profile: state.user.profile,
    }),
    (dispatch) =>
        bindActionCreators({
            userProfileSetState,
            updateProfileSuccess,
        }, dispatch)
)(ProfileGeneral);

export default localize(ProfileGeneralConnected, 'locale');
