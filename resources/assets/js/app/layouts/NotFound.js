import React, { Component } from 'react';
import { Link } from 'react-router';
import {localize} from 'react-localize-redux';
import PageHeader from '../components/PageHeader';

class NotFound extends Component {
    render() {
        const {translate} = this.props;
        return (
            <div className="container text-center">
                <PageHeader header={translate('page_not_found')} />
                <hr />
                <Link to="/">{translate('go_to_home_page')}</Link>
            </div>
        )
    }
}

export default localize(NotFound, 'locale');
