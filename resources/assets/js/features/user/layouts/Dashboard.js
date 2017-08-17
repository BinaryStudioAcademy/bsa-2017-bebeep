import React, { Component } from 'react';

import PageHeader from 'app/components/PageHeader';
import { getAuthUser } from 'app/services/AuthService';

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
