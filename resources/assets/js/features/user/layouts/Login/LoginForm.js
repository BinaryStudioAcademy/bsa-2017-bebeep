import React from 'react';
import { localize } from 'react-localize-redux';

import ContainerWrapper from 'app/layouts/ContainerWrapper';
import PageHeader from 'app/components/PageHeader';
import Form from 'features/user/components/Login/Form';

import LangService from 'app/services/LangService';
import * as lang from 'features/user/lang/Login/LoginForm.locale.json';

class LoginForm extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const { translate } = this.props;

        return (
            <ContainerWrapper>
                <section className="form-block-center">
                    <PageHeader header={ translate('login_form.header_login') } />
                    <Form />
                </section>
            </ContainerWrapper>
        )
    }
}

export default localize(LoginForm, 'locale');
