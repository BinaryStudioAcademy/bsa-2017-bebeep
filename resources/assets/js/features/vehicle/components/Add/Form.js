import React from 'react';
import { connect } from 'react-redux';
import { doCreate } from '../../actions';
import Input from './Input';
import { browserHistory } from 'react-router';

class Form extends React.Component {

    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.dispatch(doCreate({
            brand: e.target['brand'].value,
            model: e.target['model'].value,
            color: e.target['color'].value,
            year: e.target['year'].value,
            body: e.target['body'].value,
            seats: e.target['seats'].checked,
            photo: e.target['photo'].checked,
        }));
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.successCreate) {
    //         browserHistory.push('/create/success');
    //     }
    // }

    render() {
        const {errors} = this.props;
// Car brand
// Car model
// Color
// Year
// Body
// Seats
// Photo
        return (
            <form role="form" className="card vehicle-form" action="/api/car/create" method="POST"
                  onSubmit={ this.onSubmit }>
                <div className="card-header">
                    Enter vehicle details
                </div>
                <div className="card-block">
                    <Input
                        type="text"
                        name="brand"
                        id="brand"
                        required={true}
                        error={errors.brand}
                    >Vehicle Brand</Input>
                    <Input
                        type="text"
                        name="model"
                        id="model"
                        required={true}
                        error={errors.model}
                    >Model</Input>
                    <Input
                        type="year"
                        name="year"
                        id="year"
                        required={true}
                        error={errors.year}
                    >Year</Input>
                    <Input
                        type="text"
                        name="color"
                        id="color"
                        required={true}
                        error={errors.color}
                    >Color</Input>
                    <Input
                        type="text"
                        name="body"
                        id="body"
                        required={true}
                        error={errors.body}
                    >Body</Input>

                    <Input
                        type="text"
                        name="seats"
                        id="seats"
                        required={true}
                        error={errors.seats}
                    >Seats</Input>
                    <Input
                        type="text"
                        name="photo"
                        id="photo"
                        required={true}
                    >Photo</Input>
                </div>

                <div className="card-footer">
                    <div className="text-center">
                        <button className="btn btn-primary">
                            Create
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

const FormConnected = connect(
    (state) => ({
        errors: state.vehicle.create.errors,
        successCreate: state.vehicle.create.success
    })
)(Form);

export default FormConnected;