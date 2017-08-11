import React from 'react';

class DirectionsMap extends React.Component {
    render() {
        return (
            <div className="card">
                <div className="card-header">
                    {this.props.title}
                </div>
                <div className="card-block">
                </div>
            </div>
        );
    }
}

export default DirectionsMap;