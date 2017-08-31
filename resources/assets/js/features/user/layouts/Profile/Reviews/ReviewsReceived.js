import React from 'react';
import LangService from 'app/services/LangService';
import * as lang from '../../../lang/Profile/Reviews/ReviewsReceived.locale.json';
import {localize} from 'react-localize-redux';
import PageHeader from 'app/components/PageHeader';

class ReviewsReceived extends React.Component {
    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {translate} = this.props;

        return (
            <div>
                <PageHeader header={ translate('reviews_received.header') }/>

            </div>
        );
    }
}

export default localize(ReviewsReceived, 'locale');
