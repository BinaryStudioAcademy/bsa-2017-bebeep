import React from 'react';

import PageHeader from 'app/components/PageHeader';
import Form from 'features/user/components/Register/Form';

import LangService from 'app/services/LangService';
import * as lang from 'features/user/lang/Register/RegisterForm.locale.json';
import {localize} from 'react-localize-redux';

class RegisterForm extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {translate} = this.props;
        return (
            <div>
                <PageHeader header={ translate('register_form.header_register') } />
                <Form id={ this.props.params.id } />
            </div>
        )
    }
}

export default localize(RegisterForm, 'locale');
