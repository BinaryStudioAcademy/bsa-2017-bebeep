import React from 'react';
import { connect } from 'react-redux';
import createTripDispatch from '../../actions';
import { bindActionCreators } from 'redux';

class CreateTrip extends React.Component {

    onSubmit(e) {
        e.preventDefault();
        let date = new Date(e.target['start_at'].value).getTime() / 1000;
        this.props.dispatch(createTripDispatch({
            vehicle_id: e.target['vehicle_id'].value,
            start_at: Math.round(date),
            end_at: 1513036800,
            from: e.target['from'].value.split(),
            to: e.target['to'].value.split(),
            price: e.target['price'].value,
            seats: e.target['seats'].value,
        }));
    }

    render() {
        const {errors} = this.props;
        return (
            <form role="form" className="form-horizontal" action="/api/trips/create" method="POST" onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="vehicle_id">Select car</label>
                    <div className="col-sm-6">
                        <select name="vehicle_id" className="form-control" id="vehicle_id" required="required">
                            <option value="1">1</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="start_at">Trip start time</label>
                    <div className="col-sm-6">
                        <input type="datetime-local" name="start_at" className="form-control" id="start_at" required="required"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="price">Price</label>
                    <div className="col-sm-6">
                        <input type="number" min="1" name="price" className="form-control" id="price" required="required"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="seats">Available seats</label>
                    <div className="col-sm-6">
                        <input type="number" min="1" max="3" name="seats" className="form-control" id="seats" required="required"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="from">From location</label>
                    <div className="col-sm-6">
                        <input type="search" name="from" className="form-control" id="from" required="required"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="to">To location</label>
                    <div className="col-sm-6">
                        <input type="search" name="to" className="form-control" id="to" required="required"/>
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

const CreateTripDispatch = connect(
    (state) => ({
        errors: state.trip.create.errors
    })
)(CreateTrip);

export default CreateTripDispatch;
