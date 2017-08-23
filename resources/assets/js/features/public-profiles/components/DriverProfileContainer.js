import React from 'react';
import {localize} from 'react-localize-redux';
import Preloader from 'app/components/Preloader';

import "../styles/driver-profile.scss";

class DriverProfileContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: [],
            preloader: true,
        }
    }

    componentDidMount() {
        console.log('mounted');
        this.setState({preloader: false});
    }

    render() {
        const { id, translate } = this.props;
        const { preloader } = this.state;

        if (preloader) {
            return (
                <div>
                    <Preloader enable={true}/>
                    <div className="justify-content-center loading-placeholder loading-placeholder_show">
                        <span className="align-self-center">{translate('driver_public_profile.loading')}</span>
                    </div>
                </div>
            );
        }

        return (
            <div className="row">
                <div className="col-md-8">Profile</div>
                <div className="col-md-4">Data</div>
            </div>
        );
    }
}

export default localize(DriverProfileContainer, 'locale');
