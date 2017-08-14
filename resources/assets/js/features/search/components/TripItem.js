import React from 'react';

class TripItem extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default TripItem;