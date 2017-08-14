import React, { Component } from 'react';
import MapDirection from './MapDirection';
import Modal from '../../../app/components/Modal';
import './css/modal.scss';


class MapModal extends Component {
    constructor() {
        super();
        this.state = {
            formIsOpen: false
        };
    }

    componentWillReceiveProps(newProps) {
        if (this.state.formIsOpen !== newProps.isOpen) {
            this.setState({formIsOpen: newProps.isOpen});
        }
    }


    render() {
        let modalData = this.props.modalData;
        const {formIsOpen} = this.state;
        const onClosed = this.props.onClosed || (() => {});

        return (
            <Modal isOpen={formIsOpen} onClosed={() => { this.state.formIsOpen = false; onClosed(); }}>
                    <div className="modal-header">MAP:</div>
                    <div className="modal-body">
                        <div className="big-map">
                            <MapDirection from={modalData.from} to={modalData.to}/>
                        </div>
                    </div>
                    <div className="modal-footer text-right">
                        <button className="btn" onClick={(e) => {
                            e.preventDefault();
                            this.state.formIsOpen = false;
                            onClosed();
                        }}>Close</button>
                    </div>
            </Modal>
        );
    }
}


export default MapModal;