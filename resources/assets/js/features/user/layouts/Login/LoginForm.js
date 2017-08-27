import React from 'react';

import PageHeader from 'app/components/PageHeader';
import Form from 'features/user/components/Login/Form';

import LangService from 'app/services/LangService';
import * as lang from 'features/user/lang/Login/LoginForm.locale.json';
import {localize} from 'react-localize-redux';

import 'features/user/styles/user.scss';

class LoginForm extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {translate} = this.props;
        return (
            <div>
                <PageHeader header={ translate('login_form.header_login') } />
                <Form />
            </div>
        )
    }
}

export default localize(LoginForm, 'locale');
