import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/search-placeholder.scss';

class Placeholder extends React.Component {

    render() {
        const {show} = this.props;

        return (
            <div className={"justify-content-center search-placeholder" + (show ? " search-placeholder_show" : "")}>
                <span className="align-self-center">{this.props.children}</span>
            </div>
        );
    }
}
 
Placeholder.PropTypes = {
    show: PropTypes.bool.isRequired
};

export default Placeholder;