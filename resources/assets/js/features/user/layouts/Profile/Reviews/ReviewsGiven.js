import React from 'react';
import LangService from 'app/services/LangService';
import * as lang from '../../../lang/Profile/Reviews/ReviewsGiven.locale.json';
import {localize} from 'react-localize-redux';
import PageHeader from 'app/components/PageHeader';
import ReviewsContainer from '../../../components/Profile/Reviews/ReviewsContainer';

class ReviewsGiven extends React.Component {
    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {translate} = this.props;

        return (
            <div>
                <PageHeader header={ translate('reviews_given.header') }/>
                <ReviewsContainer reviews={[
                    {
                        id: 1,
                        user: {
                            full_name: "Ivan Ivanov",
                            photo: null
                        },
                        comment: "asdasd",
                        date: Date.now(),
                        mark: 4
                    },
                    {
                        id: 2,
                        user: {
                            full_name: "Petr Petrov",
                            photo: null
                        },
                        comment: "Hjfskaf askfkas asf",
                        date: Date.now() - 60 * 60 * 24 * 1000,
                        mark: 3
                    }
                ]}/>
            </div>
        );
    }
}

export default localize(ReviewsGiven, 'locale');
