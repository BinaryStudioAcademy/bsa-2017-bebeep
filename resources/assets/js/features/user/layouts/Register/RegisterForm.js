import React, { Component } from 'react';

import Form from '../../components/Register/Form';
import PageHeader from '../../../../app/components/PageHeader';

import LangService from '../../../../app/services/LangService';
import * as lang from '../../lang/Register/RegisterForm.locale.json';
import {localize} from 'react-localize-redux';

class RegisterForm extends Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {translate} = this.props;
        return (
            <div>
                <PageHeader header={ translate('header_register') } />
                <Form id={ this.props.params.id } />
            </div>
        )
    }
}

export default localize(RegisterForm, 'locale');
