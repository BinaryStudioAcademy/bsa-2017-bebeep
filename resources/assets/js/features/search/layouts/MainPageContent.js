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
                            <div className="main-page__block-step">
                                <div className="main-page__block-step-one">
                                    <span className="mb-2">{translate('main_page_content.step-one.main-text')}</span>
                                    <div className="row mt-4">
                                        <div className="col-md-2">
                                            <i className="fa fa-map-marker main-page__block-step-ico" aria-hidden="true"></i>
                                        </div>
                                        <div className="col-md-10 pl-0">
                                            <div className="main-page__block-step-one-secondary-text">
                                                {translate('main_page_content.step-one.secondary-text')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 p-2">
                            <div className="main-page__block-step">
                                <div className="main-page__block-step-two">
                                    <span className="mb-2">{translate('main_page_content.step-two.main-text')}</span>
                                    <div className="row mt-4">
                                        <div className="col-md-2">
                                            <i className="fa fa-tasks main-page__block-step-ico" aria-hidden="true"></i>
                                        </div>
                                        <div className="col-md-10 pl-3">
                                            <div className="main-page__block-step-two-secondary-text">
                                                {translate('main_page_content.step-two.secondary-text')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 p-2">
                            <div className="main-page__block-step">
                                <div className="main-page__block-step-three">
                                    <span className="mb-2">{translate('main_page_content.step-three.main-text')}</span>
                                    <div className="row mt-4">
                                        <div className="col-md-2">
                                            <i className="fa fa-check-circle-o main-page__block-step-ico" aria-hidden="true"></i>
                                        </div>
                                        <div className="col-md-10 pr-2">
                                            <div className="main-page__block-step-three-secondary-text">
                                                {translate('main_page_content.step-three.secondary-text')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}, 'locale');
