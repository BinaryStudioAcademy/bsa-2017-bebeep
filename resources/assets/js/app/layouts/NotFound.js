import React, { Component } from 'react';
import { Link } from 'react-router';

import PageHeader from 'app/components/PageHeader';

class NotFound extends Component {

    render() {
        return (
            <div className="container text-center">
                <PageHeader header={'This is a demo 404 page!'} />
                <hr />
                <Link to="/">Back To Home View</Link>
            </div>
        )
    }
}

export default NotFound;
