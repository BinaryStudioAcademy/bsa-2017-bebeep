import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import LangService from 'app/services/LangService';
import {getTranslate} from 'react-localize-redux';
import * as lang from 'features/user/lang/Register/RegisterSuccess.locale.json';
import PageHeader from 'app/components/PageHeader';

class RegisterSuccess extends React.Component {

    componentWillMount() {
        if (!this.props.successRegister) {
            browserHistory.push('/registration');
        }
        LangService.addTranslation(lang);
    }

    render() {
        const {translate} = this.props;

        return (
            <div>
                <PageHeader header={ translate('header_register') } />
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
    })
)(RegisterSuccess);

export default RegisterSuccessConnected;
