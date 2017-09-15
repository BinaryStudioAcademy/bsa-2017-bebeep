import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { UncontrolledTooltip } from 'reactstrap';
import { localize } from 'react-localize-redux';

import LangService from 'app/services/LangService';
import * as LangButtons from 'app/lang/buttons.locale.json';

class LinkButton extends React.Component {

    componentWillMount() {
        LangService.addTranslation(LangButtons);
    }

    renderTooltip() {
        const { translate, tooltip, id, tlpDelay, tlpAutohide, tlpPlacement } = this.props;

        if (!tooltip) {
            return null;
        }

        return (
            <UncontrolledTooltip target={id}
                delay={tlpDelay}
                autohide={tlpAutohide}
                placement={tlpPlacement}
            >
                {translate(`buttons.${id}.tooltip`)}
            </UncontrolledTooltip>
        );
    }

    render() {
        const { pathTo, id, className, iconClassName } = this.props;

        return (
            <div>
                <Link to={pathTo}
                    id={id}
                    className={"btn btn--with-icon btn-primary " + className}
                >
                    <i className={"fa " + iconClassName} aria-hidden="true" />
                </Link>

                {this.renderTooltip()}
            </div>
        );
    }
}

LinkButton.defaultProps = {
    className: '',
    tooltip: true,
    tlpDelay: { show: 250, hide: 50 },
    tlpAutohide: true,
    tlpPlacement: 'top',
};

LinkButton.propTypes = {
    pathTo: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    iconClassName: PropTypes.string.isRequired,
    className: PropTypes.string,
    tooltip: PropTypes.bool,

    // Tooltip props

    // optionally override show/hide delays - default { show: 0, hide: 250 }
    tlpDelay: PropTypes.oneOfType([
        PropTypes.shape({ show: PropTypes.number, hide: PropTypes.number }),
        PropTypes.number
    ]),
    // optionally hide tooltip when hovering over tooltip content - default true
    tlpAutohide: PropTypes.bool,
    // optionally tooltip placement - default top
    tlpPlacement: PropTypes.oneOf([
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

export default localize(LinkButton, 'locale');
