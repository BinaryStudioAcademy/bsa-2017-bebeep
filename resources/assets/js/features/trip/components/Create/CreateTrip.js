import React from 'react';
import { connect } from 'react-redux';
import createTripDispatch from '../../actions';
import { bindActionCreators } from 'redux';

class CreateTrip extends React.Component {

    onSubmit(e) {
        e.preventDefault();
        this.props.dispatch(createTripDispatch({
            vehicle_id: /*e.target['vehicle_id'].value*/ 1,
            start_at: /*e.target['start_at'].value*/ 1502359200,
            end_at: 1502445600,
            from: /*e.target['from'].value*/ ['a'],
            to: /*e.target['to'].value*/ ['b'],
            price: 350,
            seats: 3,
            user_id: 1
        }));
    }

    render() {
        const {errors} = this.props;
        return (
            <form role="form" className="form-horizontal" action="/api/trips/create" method="POST" onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="vehicle_id">Select car:</label>
                    <div className="col-sm-6">
                        <select name="vehicle_id" className="form-control" id="vehicle_id" required="required">
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="start_at">Trip start time:</label>
                    <div className="col-sm-6">
                        <input type="datetime-local" name="start_at" className="form-control" id="start_at" required="required"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="from">From location:</label>
                    <div className="col-sm-6">
                        <input type="search" name="from" className="form-control" id="from" required="required"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="to">To location:</label>
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
