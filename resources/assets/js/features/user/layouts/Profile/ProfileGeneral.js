import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { localize } from 'react-localize-redux';

import { userProfileSetState, userProfileUpdateState } from 'features/user/actions';

import Preloader from 'app/components/Preloader';
import PageHeader from 'app/components/PageHeader';
import GeneralForm from 'features/user/components/Profile/GeneralForm';
import StatusModal from 'features/user/components/_Modals/StatusModal';

import UserService from 'features/user/services/UserService';
import LangService from 'app/services/LangService';
import * as lang from 'features/user/lang/Profile/ProfileGeneral.locale.json';


class ProfileGeneral extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            preloader: true,
            notFoundOrError: false,
            modal: {
                isOpen: false,
                status: 'error',
                msg: '',
            },
        };

        this.setStatusModal = this.setStatusModal.bind(this);
    }

    componentWillMount() {
        LangService.addTranslation(lang);
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

    setStatusModal(options) {
        const { status, msg } = options;

        this.setState({
            modal: {
                isOpen: true,
                status,
                msg,
            }
        });
    }

    renderContent() {
        const { translate, profile, userProfileUpdateState } = this.props,
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
                profile={ profile }
                updateProfileSuccess={ userProfileUpdateState }
                setStatusModal={ this.setStatusModal }
            />
        );
    }

    render() {
        const { translate } = this.props,
            { modal } = this.state;

        return (
            <div>
                <PageHeader header={ translate('profile_general.personal_information') } />
                { this.renderContent() }

                <StatusModal
                    modal={ modal }
                    isOpen={ modal.isOpen }
                    onClosed={ () => this.state.modal.isOpen = false }
                />
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
            userProfileUpdateState,
        }, dispatch)
)(ProfileGeneral);

export default localize(ProfileGeneralConnected, 'locale');
