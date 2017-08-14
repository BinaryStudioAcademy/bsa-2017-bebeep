import React from 'react';
import TripItem from './TripItem';

class TripList extends React.Component {
    render() {
        return (
            <div>
                <TripItem>1</TripItem>
                <TripItem>2</TripItem>
                <TripItem>3</TripItem>
            </div>
        )
    }
}

export default TripList;