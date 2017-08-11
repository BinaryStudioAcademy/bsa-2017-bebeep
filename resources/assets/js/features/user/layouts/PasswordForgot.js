import React from 'react';
import PageHeader from '../../../app/components/PageHeader';
import PasswordForgotModal from '../components/PasswordForgotModal';

class PasswordForgot extends React.Component {
    constructor() {
        super();
        this.state = {
            forgotModalIsOpen: false
        };
    }

    render() {
        return (
            <div>
                <PageHeader header={ 'Recover password' } />
                <a href="#" onClick={(e) => {
                    e.preventDefault();
                    this.setState({forgotModalIsOpen: true});
                }}>Forgot password ?</a>
                <PasswordForgotModal isOpen={this.state.forgotModalIsOpen}/>
            </div>
        );
    }
}

export default PasswordForgot;
