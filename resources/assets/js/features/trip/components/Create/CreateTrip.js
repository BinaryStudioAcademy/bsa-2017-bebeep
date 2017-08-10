import React from 'react';
import { connect } from 'react-redux';
import createTripDispatch from '../../actions';
import { bindActionCreators } from 'redux';
import Input from '../../../../app/components/Input';

class CreateTrip extends React.Component {

    onSubmit(e) {
        e.preventDefault();
        let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3QiLCJpYXQiOjE1MDIzNTc3NjMsImV4cCI6MTUwMjk2MjU2MywibmJmIjoxNTAyMzU3NzYzLCJqdGkiOiJVYXpNbHkyYVFIV2pPcnBjIn0._eSxtg_VASZu-vfji9TYzfMcFQ6AVm40MEZ0gA_8InU';
        let date = new Date(e.target['start_at'].value).getTime() / 1000;
        this.props.createTripDispatch({
            vehicle_id: e.target['vehicle_id'].value,
            start_at: Math.round(date),
            end_at: 1513036800,
            price: e.target['price'].value,
            seats: e.target['seats'].value,
            from: e.target['from'].value.split(),
            to: e.target['to'].value.split(),
        }, token);
    }

    render() {
        const {errors} = this.props;
        return (
            <form role="form" className="trip-create-from" action="/api/trips/create" method="POST" onSubmit={this.onSubmit.bind(this)}>
                <div className={"form-group row" + (errors.vehicle_id ? 'has-danger' : '')}>
                    <label className="form-control-label text-muted col-sm-4" htmlFor="vehicle_id">Select car</label>
                    <div className="col-sm-8">
                        <select name="vehicle_id" className="form-control" id="vehicle_id" >
                            <option value="2">2</option>
                        </select>
                        <div className="form-control-feedback">{ errors.vehicle_id }</div>
                    </div>
                </div>
                <Input
                    type="datetime-local"
                    name="start_at"
                    id="start_at"
                    required={false}
                    error={errors.start_at}>Trip start time
                </Input>
                <Input
                    type="number"
                    name="price"
                    id="price"
                    required={false}
                    error={errors.price}>Price
                </Input>
                <Input
                    type="number"
                    name="seats"
                    id="seats"
                    required={false}
                    error={errors.seats}>Available seats
                </Input>
                <Input
                    type="text"
                    name="from"
                    id="from"
                    required={false}
                    error={errors.from}>Start point
                </Input>
                <Input
                    type="text"
                    name="to"
                    id="to"
                    required={false}
                    error={errors.to}>Endpoint
                </Input>
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
    }),
    (dispatch) => bindActionCreators({createTripDispatch}, dispatch)
)(CreateTrip);

export default CreateTripDispatch;
