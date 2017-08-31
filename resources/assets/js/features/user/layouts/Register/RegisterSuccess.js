import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getTranslate } from 'react-localize-redux';

import ContainerWrapper from 'app/layouts/ContainerWrapper';
import PageHeader from 'app/components/PageHeader';

import LangService from 'app/services/LangService';
import * as lang from 'features/user/lang/Register/RegisterSuccess.locale.json';


class RegisterSuccess extends React.Component {

    componentWillMount() {
        if (!this.props.successRegister) {
            browserHistory.push('/registration');
        }
        LangService.addTranslation(lang);
    }

    render() {
        const { translate } = this.props;

        return (
            <ContainerWrapper>
                <PageHeader header={ translate('register_success.header_register') } />
                <div className="card" >
                    <div className="card-block">
                        <div className="alert alert-success" role="alert">
                            {translate('register_success.register_success')}
                        </div>
                    </div>
                </div>
            </ContainerWrapper>
        );
    }
}

const RegisterSuccessConnected = connect(
    (state) => ({
        successRegister: state.user.register.success,
        translate: getTranslate(state.locale)
    })
)(RegisterSuccess);

export default RegisterSuccessConnected;
