import React, { Component } from 'react';

import PageHeader from '../../../../app/components/PageHeader';
import PasswordForm from '../../components/Profile/PasswordForm';
import LangService from '../../../../app/services/LangService';
import * as lang from '../../lang/Profile/ProfilePassword.locale.json';
import {localize} from 'react-localize-redux';

class ProfilePassword extends Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {translate} = this.props;
        return (
            <div>
                <PageHeader header={ translate('change_password') } />
                <PasswordForm />
            </div>
        )
    }
}

export default localize(ProfilePassword, 'locale');
