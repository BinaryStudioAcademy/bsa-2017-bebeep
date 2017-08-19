import React, { Component } from 'react';

import PageHeader from '../../../../app/components/PageHeader';
import GeneralForm from '../../components/Profile/GeneralForm';
import LangService from '../../../../app/services/LangService';
import * as lang from '../../lang/Profile/ProfileGeneral.locale.json';
import {localize} from 'react-localize-redux';

class ProfileGeneral extends Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {translate} = this.props;
        return (
            <div>
                <PageHeader header={ translate('personal_information') } />
                <GeneralForm />
            </div>
        )
    }
}

export default localize(ProfileGeneral, 'locale');
