import React, { Component } from 'react';

import PageHeader from '../../../../app/components/PageHeader';
import Form from '../../components/Login/Form';

import {addTranslation} from 'react-localize-redux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as lang from '../../lang/Login/LoginForm.locale.json';

import '../../styles/user.scss';

class LoginForm extends Component {

    componentWillMount() {
        this.props.addTranslation(lang);
    }

    render() {
        return (
            <div>
                <PageHeader header={ 'Login' } />
                <Form />
            </div>
        )
    }
}

export default connect(
    null,
    dispatch => bindActionCreators({addTranslation}, dispatch)
)(LoginForm);
