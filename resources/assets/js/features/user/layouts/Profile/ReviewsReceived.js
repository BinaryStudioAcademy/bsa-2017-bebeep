import React from 'react';
import { localize } from 'react-localize-redux';

import PageHeader from 'app/components/PageHeader';

import LangService from 'app/services/LangService';
import * as lang from 'features/user/lang/Profile/ReviewsReceived.locale.json';

class ReviewsReceived extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const { translate } = this.props;

        return (
            <div>
                <PageHeader header={ translate('reviews_received.page_header') } />
            </div>
        )
    }
}

export default localize(ReviewsReceived, 'locale');
