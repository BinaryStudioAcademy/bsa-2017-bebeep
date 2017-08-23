import React from 'react';
import {localize} from 'react-localize-redux';

import "../styles/driver-profile.scss";

class DriverComment extends React.Component {

    render() {
        const { translate } = this.props;

        return (
            <div className="driver-comments">
                <p className="text-left"><strong>{translate('driver_public_profile.driver_comments')}</strong><br/></p>
                {/*comment*/}
                <div className="row comment">
                    <div className="col-sm-2">
                        <img className="img-responsive user-photo" src="https://s-media-cache-ak0.pinimg.com/736x/a6/b6/90/a6b69091b0a020ce52af8babd42b9929--hairstyles-for-round-faces-best-hairstyles.jpg"/>
                    </div>
                    <div className="col-sm-10">
                        <div className="card">
                            <div className="card-header">
                                <strong>user</strong> <span className="text-muted">{translate('driver_public_profile.driver_comment_info', {days: 5})}</span>
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
                {/*comment*/}
                <div className="row comment">
                    <div className="col-sm-2">
                        <img className="img-responsive user-photo" src="http://static4.businessinsider.com/image/55b0ead86da811bc52309d7f-100-100/ben-gilbert.jpg"/>
                    </div>
                    <div className="col-sm-10">
                        <div className="card">
                            <div className="card-header">
                                <strong>user</strong> <span className="text-muted">{translate('driver_public_profile.driver_comment_info', {days: 5})}</span>
                                <span className="pull-right">
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                </span>
                            </div>
                            <div className="card-block">
                                Nice and safety, thanks!
                            </div>
                        </div>
                    </div><br/>
                </div>
            </div>
        );
    }
}

export default localize(DriverComment, 'locale');
