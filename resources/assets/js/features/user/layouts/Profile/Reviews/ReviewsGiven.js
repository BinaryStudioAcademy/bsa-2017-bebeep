import React from 'react';
import LangService from 'app/services/LangService';
import * as lang from '../../../lang/Profile/Reviews/ReviewsGiven.locale.json';
import {localize} from 'react-localize-redux';
import PageHeader from 'app/components/PageHeader';
import GivenContainer from '../../../components/Profile/Reviews/GivenContainer';

class ReviewsGiven extends React.Component {
    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {translate} = this.props;

        return (
            <div>
                <PageHeader header={ translate('reviews_given.header') }/>
                <GivenContainer />
            </div>
        );
    }
}

export default localize(ReviewsGiven, 'locale');
