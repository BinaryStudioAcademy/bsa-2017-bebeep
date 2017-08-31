import React from 'react';
import LangService from 'app/services/LangService';
import * as lang from '../../../lang/Profile/Reviews/ReviewsReceived.locale.json';
import {localize} from 'react-localize-redux';
import PageHeader from 'app/components/PageHeader';
import ReviewsContainer from '../../../components/Profile/Reviews/ReviewsContainer';
import Rating from '../../../components/Profile/Reviews/Rating';

class ReviewsReceived extends React.Component {
    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {translate} = this.props;

        return (
            <div>
                <PageHeader header={ translate('reviews_received.header') }/>
                <Rating
                    marks={[1, 1, 1, 2, 1]}
                />
                <ReviewsContainer reviews={[
                    {
                        id: 1,
                        user: {
                            full_name: "Ivan Ivanov",
                            photo: null
                        },
                        comment: "asdasd",
                        date: Date.now() - 60 * 60 * 24 * 5 * 1000,
                        mark: 3
                    }
                ]}/>
            </div>
        );
    }
}

export default localize(ReviewsReceived, 'locale');
