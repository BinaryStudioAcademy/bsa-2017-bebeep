import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { hideModal } from "../actions";
import Map from './map';

import './css/modal.scss';

class Modal extends Component {
    render() {
        let modalData = this.props.tripsState.modalData;
        if (this.props.tripsState.isOpen === false)
            return null;

        return (
            <div className="backdropStyle">
                <div className="modalStyle">
                    <div className="big-map">
                        <Map from={modalData.from} to={modalData.to} />
                    </div>
                    <div className="row">
                        <div className="col-md-10" />
                        <div className="col-md-1">
                            <button className="btn btn-secondary" onClick={this.props.hideModal}>Close</button>
                        </div>
                    </div>
                </div>

                <div className="backdropStyle"
                     onClick={this.props.hideModal}/>

            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
      tripsState: state.tripsList
    }
}

function mapDispatchToProps(dispatch) {
return bindActionCreators({hideModal}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Modal);

