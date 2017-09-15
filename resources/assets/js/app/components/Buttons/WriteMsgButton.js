import React from 'react';
import PropTypes from 'prop-types';

import LinkButton from './LinkButton';
import { isThisIdOfAuthUser } from 'app/services/UserService';

const PATH_TO = '/dashboard/messages/';

class WriteMsgButton extends React.Component {

    render() {
        const { userId } = this.props;

        if (isThisIdOfAuthUser(userId)) {
            return null;
        }

        return (
            <LinkButton pathTo={PATH_TO + userId}
                {...this.props}
            />
        );
    }
}

WriteMsgButton.defaultProps = {
    id: 'write_msg_to_user',
    iconClassName: 'fa-envelope',
    className: '',
    tooltip: true,
};

WriteMsgButton.propTypes = {
    id: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    iconClassName: PropTypes.string.isRequired,
    className: PropTypes.string,
    tooltip: PropTypes.bool,
};

export default WriteMsgButton;
