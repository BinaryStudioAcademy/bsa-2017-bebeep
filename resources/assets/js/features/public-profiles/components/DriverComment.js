import React from 'react';
import {localize} from 'react-localize-redux';

import "../styles/driver-profile.scss";

class DriverComment extends React.Component {

    render() {
        const { translate } = this.props;

        return (
            <div className="driver-comments">
                <p className="text-left"><strong>{translate('driver_public_profile.driver_comments')}</strong><br/></p>
                <div className="row comment">
                    <div className="col-sm-2">
                        <img className="img-responsive user-photo" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png"/>
                    </div>
                    <div className="col-sm-10">
                        <div className="card">
                            <div className="card-header">
                                <strong>user</strong> <span className="text-muted">commented 5 days ago</span>
                                <span className="pull-right">
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                </span>
                            </div>
                            <div className="card-block">
                                Great driver!
                            </div>
                        </div>
                    </div><br/>
                </div>
                <div className="row comment">
                    <div className="col-sm-2">
                        <img className="img-responsive user-photo" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png"/>
                    </div>
                    <div className="col-sm-10">
                        <div className="card">
                            <div className="card-header">
                                <strong>user</strong> <span className="text-muted">commented 5 days ago</span>
                                <span className="pull-right">
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                </span>
                            </div>
                            <div className="card-block">
                                Great driver!
                            </div>
                        </div>
                    </div><br/>
                </div>
            </div>
        );
    }
}

export default localize(DriverComment, 'locale');
