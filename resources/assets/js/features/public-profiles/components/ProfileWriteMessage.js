import React from 'react';
import { localize } from 'react-localize-redux';

import WriteMsgButton, { isEmptyWriteMsgButton } from 'app/components/Buttons/WriteMsgButton';

import "../styles/public-profile.scss";

class ProfileWriteMessage extends React.Component {

    render() {
        const { translate, id } = this.props;

        if (isEmptyWriteMsgButton(id)) {
            return null;
        }

        return (
            <div className="driver-car-block">
                <p className="text-left">
                    <strong>{ translate('public_profile.write_message') } </strong>
                </p>

                <WriteMsgButton userId={id}
                    className="w-100 py-2"
                    tooltip={false}
                />
            </div>
        );
    }
}

export default localize(ProfileWriteMessage, 'locale');
