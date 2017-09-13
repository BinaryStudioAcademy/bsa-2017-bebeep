import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';

class UserListContainer extends React.Component {
    constructor() {
        super();

        this.state = {
            //TODO
        };
    }


    render() {
        const {translate} = this.props;

        return (
            <div>
                <div className="col-md-8 bg-white ">

                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        translate: getTranslate(state.locale)
    }),
    dispatch => bindActionCreators({}, dispatch)
)(UserListContainer);