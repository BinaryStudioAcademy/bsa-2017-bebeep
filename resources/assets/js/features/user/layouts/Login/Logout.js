import React, { Component } from 'react';

import PageHeader from '../../../../app/components/PageHeader';
import Logout from '../../components/Login/Logout';

import {addTranslation} from 'react-localize-redux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as lang from '../../lang/Login/Logout.locale.json';

import '../../styles/user.scss';

class LogoutLayout extends Component {

    componentWillMount() {
        this.props.addTranslation(lang);
    }

    render() {
        return (
            <div>
                <PageHeader header={ 'Logout' } />
                <Logout />
            </div>
        )
    }
}

export default connect(
    null,
    dispatch => bindActionCreators({addTranslation}, dispatch)
)(LogoutLayout);
