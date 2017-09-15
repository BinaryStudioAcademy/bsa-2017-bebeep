import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { getTranslate } from 'react-localize-redux';

import { doLogout } from 'features/user/actions';

class Form extends React.Component {

    constructor() {
        super();
        this.pickMessage = this.pickMessage.bind(this);
    }

    componentWillMount() {
        this.props.doLogout();
    }

    componentDidMount() {
        setTimeout(() => {
            browserHistory.push('/');
        }, 1000);
    }

    pickMessage(code) {
        const { translate } = this.props;

        return (
            <div>{translate(
                code !== 200
                    ? 'logout.failed_logout'
                    : 'logout.successfully_logout'
            )}</div>
        );
    }

    render() {
        return this.pickMessage(this.props.httpCode);
    }

}

const LogoutConnected = connect(
    state => ({
        errors: state.user.login.errors,
        httpCode: state.user.login.httpStatus,
        translate: getTranslate(state.locale),
    }),
    (dispatch) =>
        bindActionCreators({ doLogout }, dispatch)
)(Form);

export default LogoutConnected;
