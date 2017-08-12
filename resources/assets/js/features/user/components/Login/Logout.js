import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { bindActionCreators } from 'redux';
import '../../styles/user.scss';

class Form extends React.Component {

    constructor(props) {
        super();
    }

    componentDidMount() {
        this.props.actions.doLogout();
    }

    render() {

        return (
            <div>You were successfully logout!</div>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect((state) => ({
    errors: state.user.login.errors,
    httpCode: state.user.login.httpStatus
}), mapDispatchToProps)(Form);