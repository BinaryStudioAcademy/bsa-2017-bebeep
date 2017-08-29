import React from 'react';
import { localize } from 'react-localize-redux';

import PageHeader from 'app/components/PageHeader';
import PasswordForm from 'features/user/components/Profile/PasswordForm';

import LangService from 'app/services/LangService';
import * as lang from 'features/user/lang/Profile/ProfilePassword.locale.json';

class ProfilePassword extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const { translate } = this.props;

        return (
            <div>
                <PageHeader header={ translate('profile_password.change_password') } />
                <PasswordForm />
            </div>
        )
    }
}

export default localize(ProfilePassword, 'locale');
