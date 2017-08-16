import React, { Component } from 'react';

import { getAuthUser } from '../../../app/services/AuthService';

import PageHeader from '../../../app/components/PageHeader';

class Dashboard extends Component {

    render() {
        const authUser = getAuthUser();

        return (
            <section className="page-section">
                <PageHeader header={ 'Dashboard' } />
                <p className="text-center">Hello, { authUser.username }! :-)</p>
            </section>
        )
    }
}

export default Dashboard;
