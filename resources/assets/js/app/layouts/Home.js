import React, { Component } from 'react';
import {localize} from 'react-localize-redux';
import PageHeader from '../components/PageHeader';

class Home extends Component {

    render() {
        const {translate} = this.props;
        return (
            <div>
                <PageHeader header={translate('home_page')} />
            </div>
        )
    }
}

export default localize(Home, 'locale');
