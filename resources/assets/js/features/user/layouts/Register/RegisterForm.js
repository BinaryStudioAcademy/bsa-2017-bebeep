import React from 'react';
import { localize } from 'react-localize-redux';

import ContainerWrapper from 'app/layouts/ContainerWrapper';
import PageHeader from 'app/components/PageHeader';
import Form from 'features/user/components/Register/Form';

import LangService from 'app/services/LangService';
import * as lang from 'features/user/lang/Register/RegisterForm.locale.json';

class RegisterForm extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const { translate } = this.props;

        return (
            <ContainerWrapper>
                <PageHeader header={ translate('register_form.header_register') } />
                <Form id={ this.props.params.id } />
            </ContainerWrapper>
        );
    }
}

export default localize(RegisterForm, 'locale');
