import React, { Component } from 'react';

import PageHeader from '../../../../app/components/PageHeader';
import Form from '../../components/Login/Form';

import LangService from '../../../../app/services/LangService';
import * as lang from '../../lang/Login/LoginForm.locale.json';
import {localize} from 'react-localize-redux';

import '../../styles/user.scss';

class LoginForm extends Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {translate} = this.props;
        return (
            <div>
                <PageHeader header={ translate('header_login') } />
                <Form />
            </div>
        )
    }
}

export default localize(LoginForm, 'locale');
