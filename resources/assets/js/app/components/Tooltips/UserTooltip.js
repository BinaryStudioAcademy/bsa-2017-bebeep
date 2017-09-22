import React from 'react';
import PropTypes from 'prop-types';
import { UncontrolledTooltip } from 'reactstrap';
import { localize } from 'react-localize-redux';

class UserTooltip extends React.Component {

    getTooltipContent() {
        const { translate, user } = this.props;

        const age = translate('user.age', { age: user.age });

        return `${user.full_name} (${age})`;
    }

    render() {
        const { target, delay, autohide, placement } = this.props;

        return (
            <UncontrolledTooltip
                target={ target }
                delay={ delay }
                autohide={ autohide }
                placement={ placement }
            >
                { this.getTooltipContent() }
            </UncontrolledTooltip>
        );
    }
}

UserTooltip.defaultProps = {
    delay: { show: 250, hide: 50 },
    autohide: true,
    placement: 'top',
};

UserTooltip.propTypes = {
    // user data
    user: PropTypes.object.isRequired,
    // target ID, popover is attached to this element
    target: PropTypes.string.isRequired,
    // optionally override show/hide delays - default { show: 0, hide: 250 }
    delay: PropTypes.oneOfType([
        PropTypes.shape({ show: PropTypes.number, hide: PropTypes.number }),
        PropTypes.number
    ]),
    // optionally hide tooltip when hovering over tooltip content - default true
    autohide: PropTypes.bool,
    // optionally tooltip placement - default top
    placement: PropTypes.oneOf([
        'top',
        'bottom',
        'left',
        'right',
        'top left',
        'top center',
        'top right',
        'right top',
        'right middle',
        'right bottom',
        'bottom right',
        'bottom center',
        'bottom left',
        'left top',
        'left middle',
        'left bottom'
    ]),
};

export default localize(UserTooltip, 'locale');
