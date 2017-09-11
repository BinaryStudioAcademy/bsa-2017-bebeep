import React from 'react';
import LangService from 'app/services/LangService';
import * as lang from '../lang/SearchIndex.locale.json';
import {localize} from 'react-localize-redux';

import '../styles/main-page-content.scss';

export default localize(class MainPageContent extends React.Component {

    render() {
        const {translate} = this.props;
        return (
            <div className="main-page__block">
                <div className="container">
                    <div className="main-page__block-header">
                        <div className="main-page__block-header-text">
                            {translate('main_page_content.main-text')}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 p-2">
                            <div className="main-page__block-step main-page__block-step-one"></div>
                        </div>
                        <div className="col-md-4 p-2">
                            <div className="main-page__block-step main-page__block-step-two"></div>
                        </div>
                        <div className="col-md-4 p-2">
                            <div className="main-page__block-step main-page__block-step-three"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}, 'locale');
