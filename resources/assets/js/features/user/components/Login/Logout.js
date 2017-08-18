import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import {getTranslate} from 'react-localize-redux';
import '../../styles/user.scss';

class Form extends React.Component {

    constructor() {
        super();
        this.pickMessage = this.pickMessage.bind(this);
    }

    componentWillMount() {
        this.props.actions.doLogout();
    }

    componentDidMount() {
        setTimeout(() => {
          browserHistory.push('/')
        }, 5000);
    }

    pickMessage(code) {
        const {translate} = this.props;
        if (code != 200) {
            return (<div>{translate('failed_logout')}</div>);
        } else {
            return (<div>{translate('successfully_logout')}</div>);
        }
    }

    render() {

        return ( this.pickMessage(this.props.httpCode) );
    }

}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect((state) => ({
    errors: state.user.login.errors,
    httpCode: state.user.login.httpStatus,
    translate: getTranslate(state.locale)
}), mapDispatchToProps)(Form);