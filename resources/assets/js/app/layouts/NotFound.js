import React from 'react';
import { Link } from 'react-router';
import { localize } from 'react-localize-redux';

import ContainerWrapper from './ContainerWrapper';
import PageHeader from 'app/components/PageHeader';

class NotFound extends React.Component {

    render() {
        const { translate } = this.props;

        return (
            <ContainerWrapper className="text-center">
                <PageHeader header={ translate('page_not_found') } />

                <Link to="/">{ translate('go_to_home_page') }</Link>
            </ContainerWrapper>
        )
    }
}

export default localize(NotFound, 'locale');
