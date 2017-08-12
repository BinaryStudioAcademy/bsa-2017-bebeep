import React from 'react';

class Modal extends React.Component {

    constructor() {
        super();
        this.state = {
            isShow: false,
            isDisplay: false,
        };
    }

    show() {
        this.setState({isDisplay: true});
        setTimeout(() => this.setState({isShow: true}), 150);
    }

    hide() {
        const onClosed = this.props.onClosed || (() => {});
        this.setState({isShow: false});
        setTimeout(() => {
            this.setState({isDisplay: false});
            onClosed();
        }, 150);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.isOpen && !this.state.isShow) {
            this.show();
        }
        if (!newProps.isOpen && this.state.isShow) {
            this.hide();
        }
    }

    render() {
        const {isShow, isDisplay} = this.state;
        return (
            <div>
                <div className={"modal fade " + (isShow ? 'show' : '')}
                     tabIndex="-1"
                     role="dialog"
                     style={isDisplay ? {display: 'block'} : {}}
                     onClick={(e) => this.hide()}
                >
                    <div className="modal-dialog">
                        <div className="modal-content" onClick={(e) => e.stopPropagation() }>
                            {this.props.children}
                        </div>
                    </div>
                </div>
                <div className={"modal-backdrop fade " + (isShow ? 'show' : '')}
                     style={isDisplay ? {} : {display: 'none'}}
                ></div>
            </div>
        );
    }
}

export default Modal;