import React, { Component } from 'react';

import Form from '../../components/Register/Form';
import PageHeader from '../../../../app/components/PageHeader';

import {addTranslation} from 'react-localize-redux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as lang from '../../lang/Register/RegisterForm.locale.json';

class RegisterForm extends Component {

    componentWillMount() {
        this.props.addTranslation(lang);
    }

    render() {
        return (
            <div>
                <PageHeader header={ 'Register' } />
                <Form id={ this.props.params.id } />
            </div>
        )
    }
}

export default connect(
    null,
    dispatch => bindActionCreators({addTranslation}, dispatch)
)(RegisterForm);
