import React, { Component } from 'react';
import { connect } from 'react-redux'

import TripsListItem from './TripsListItem';

class ListWithTripsItems extends  Component{
    render() {
        const { tripsList } = this.props.state;
        let usersList = (
            <ul className="UserList">

            </ul>
        );

        return (
            <div>

                {usersList}
            </div>
        )
    }

}

// function mapStateToProps (state) {
//     return {
//         state: { ...state, users: state.users.filter(
//             item => item.user.toLowerCase().includes(state.filter.toLowerCase()))
//         }
//     }
// }
//
// export default connect(mapStateToProps)(ListWithTripsItems);
export default (ListWithTripsItems);