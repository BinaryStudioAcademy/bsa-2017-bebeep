import React from 'react';
import { localize } from 'react-localize-redux';

import { LinkButton } from 'app/components/Buttons';

import "../styles/public-profile.scss";

class ProfileWriteMessage extends React.Component {

    render() {
        const { translate, id } = this.props,
            pathTo = `/dashboard/messages/${id}`;

        return (
            <div className="driver-car-block">
                <p className="text-left">
                    <strong>{ translate('public_profile.write_message') } </strong>
                </p>

                <LinkButton pathTo={pathTo}
                    id="write_msg_to_user"
                    iconClassName="fa-envelope"
                    className="w-100 py-2"
                    tooltip={false}
                />
            </div>
        );
    }
}

export default localize(ProfileWriteMessage, 'locale');
