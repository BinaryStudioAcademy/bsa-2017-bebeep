import React from 'react';

import LangService from 'app/services/LangService';
import * as lang from 'features/user/lang/Profile/ProfileGeneral.locale.json';
import {localize} from 'react-localize-redux';
import PageHeader from 'app/components/PageHeader';
import GeneralForm from 'features/user/components/Profile/GeneralForm';

class ProfileGeneral extends React.Component {

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
