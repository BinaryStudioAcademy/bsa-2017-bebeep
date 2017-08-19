import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import {addTranslation, getTranslate} from 'react-localize-redux';
import {bindActionCreators} from 'redux';
import * as lang from '../../lang/Register/RegisterSuccess.locale.json';

import PageHeader from '../../../../app/components/PageHeader';

class RegisterSuccess extends Component {

    componentWillMount() {
        if (!this.props.successRegister) {
            browserHistory.push('/registration');
        }
        this.props.addTranslation(lang);
    }

    render() {
        const {translate} = this.props;

        return (
            <div>
                <PageHeader header={ 'Register' } />
                <div className="card" >
                    <div className="card-block">
                        <div className="alert alert-success" role="alert">
                            {translate('register_success')}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const RegisterSuccessConnected = connect(
    (state) => ({
        successRegister: state.user.register.success,
        translate: getTranslate(state.locale)
    }),
    dispatch => bindActionCreators({addTranslation}, dispatch)
)(RegisterSuccess);

export default RegisterSuccessConnected;
