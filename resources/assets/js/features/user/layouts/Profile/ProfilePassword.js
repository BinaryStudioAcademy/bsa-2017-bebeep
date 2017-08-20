import React from 'react';

import LangService from 'app/services/LangService';
import * as lang from 'features/user/lang/Profile/ProfilePassword.locale.json';
import {localize} from 'react-localize-redux';
import PageHeader from 'app/components/PageHeader';
import PasswordForm from 'features/user/components/Profile/PasswordForm';

class ProfilePassword extends React.Component {

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
