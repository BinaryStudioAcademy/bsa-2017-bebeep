import React, { Component } from 'react';

import PageHeader from '../../../app/components/PageHeader';

class Dashboard extends Component {

    render() {
        return (
            <section className="page-section">
                <PageHeader header={ 'Dashboard' } />
                <p className="text-center">Hello, User Name! :-)</p>
            </section>
        )
    }
}

export default Dashboard;
