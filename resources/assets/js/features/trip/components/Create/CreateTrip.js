import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class CreateTrip extends React.Component {
    render() {
        return (
            <form role="form" className="form-horizontal" action="/api/trip/create" method="POST" onSubmit="">
                <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="car_id">Select car:</label>
                    <div className="col-sm-6">
                        <select className="form-control" id="car_id">
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="start_at">Trip start time:</label>
                    <div className="col-sm-6">
                        <input type="datetime-local" className="form-control" id="start_at" />
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="from">From location:</label>
                    <div className="col-sm-6">
                        <input type="search" className="form-control" id="from" />
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="to">To location:</label>
                    <div className="col-sm-6">
                        <input type="search" className="form-control" id="to" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-6">
                        <button type="submit" className="btn btn-primary">Create new trip</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default CreateTrip;
