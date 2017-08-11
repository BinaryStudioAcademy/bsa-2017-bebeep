import React, { Component } from 'react';
import './css/modal.scss';

class Modal extends Component {
    render() {
        if (this.props.isOpen === false)
            return null;

        this.props.blockModal();
        return (
            <div className="backdropStyle">
                <div className="modalStyle">
                    {this.props.children}
                </div>

                <div className="backdropStyle"
                     onClick={this.props.onClose}/>

            </div>
        );
    }
    // close(e) {
    //     e.preventDefault();
    //     if (this.props.onClose) {
    //         this.props.onClose()
    //     }
    // }
}
export default Modal;