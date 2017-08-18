import React from 'react';
import PropTypes from 'prop-types';
import '../styles/preloader.scss';

class Preloader extends React.Component {

    render() {
        const {enable} = this.props;

        return (
            <div className={"preloader" + (enable ? " preloader_active" : "")}>
                <i className="fa fa-circle-o-notch fa-spin fa-4x fa-fw preloader__ico" />
            </div>
        );
    }
}

Preloader.PropTypes = {
    enable: PropTypes.bool.isRequired
};

export default Preloader;