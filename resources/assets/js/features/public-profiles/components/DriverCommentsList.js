import React from 'react';
import {localize} from 'react-localize-redux';
import DriverComment from './DriverComment';

import "../styles/driver-profile.scss";

class DriverCommentsList extends React.Component {

    render() {
        const { comments, translate } = this.props;

        if (!comments) return (<span>&nbsp;</span>);
        else {
            return (
                <div className="driver-comments">
                    <p className="text-left">
                        <strong>{translate('driver_public_profile.driver_comments')}</strong><br/></p>
                    {comments.map((comment, i) =>
                        <DriverComment
                            key={ i }
                            comment={ comment }
                        />
                    )}
                </div>
            );
        }

    }
}

export default localize(DriverCommentsList, 'locale');
