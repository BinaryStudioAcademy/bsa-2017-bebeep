import React, { Component } from 'react';

import PageHeader from '../../../../app/components/PageHeader';
import GeneralForm from '../../components/Profile/GeneralForm';

class General extends Component {

    render() {
        return (
            <div>
                <PageHeader header={ 'Personal information' } />
                <GeneralForm />
            </div>
        )
    }
}

export default General;
