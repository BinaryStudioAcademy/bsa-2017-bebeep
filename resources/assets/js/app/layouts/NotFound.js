import React, { Component } from 'react';
import { Link } from 'react-router';
import {localize} from 'react-localize-redux';
import PageHeader from '../components/PageHeader';

class NotFound extends Component {
    render() {
        const {translate} = this.props;
        return (
            <div className="container text-center">
                <PageHeader header={translate('this_is_a_demo_404_page')} />
                <hr />
                <Link to="/">{translate('back_to_home_view')}</Link>
            </div>
        )
    }
}

export default localize(NotFound, 'locale');
