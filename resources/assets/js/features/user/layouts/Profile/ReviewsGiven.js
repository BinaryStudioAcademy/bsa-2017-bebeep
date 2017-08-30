import React from 'react';
import { localize } from 'react-localize-redux';

import PageHeader from 'app/components/PageHeader';

import LangService from 'app/services/LangService';
import * as lang from 'features/user/lang/Profile/ReviewsGiven.locale.json';

class ReviewsGiven extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const { translate } = this.props;

        return (
            <div>
                <PageHeader header={ translate('reviews_given.page_header') } />
            </div>
        )
    }
}

export default localize(ReviewsGiven, 'locale');
