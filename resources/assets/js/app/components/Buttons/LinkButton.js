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
        const { translate, tooltip, id } = this.props;

        if (!tooltip) {
            return null;
        }

        return (
            <UncontrolledTooltip target={id} placement="top">
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
};

LinkButton.propTypes = {
    pathTo: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    iconClassName: PropTypes.string.isRequired,
    className: PropTypes.string,
    tooltip: PropTypes.bool,
};

export default localize(LinkButton, 'locale');
