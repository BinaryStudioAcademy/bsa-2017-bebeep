import React from 'react';

export default class CreateVehicleContainer extends React.Component {
    render() {
        return (
            <form role="form" className="card vehicle-form" action="/api/v1/car" method="POST">
                <div className="card-header">
                    Enter vehicle details
                </div>
                <div className="card-block">
                    <div className="form-group row ">
                        <label className="form-control-label text-muted col-sm-4" htmlFor="brand">Car Brand</label>
                    </div>

                    <div className="form-group row ">
                        <label className="form-control-label text-muted col-sm-4" htmlFor="model">Car Model</label>
                    </div>

                    <div className="form-group row ">
                        <label className="form-control-label text-muted col-sm-4" htmlFor="color">Color</label>
                    </div>

                    <div className="form-group row ">
                        <label className="form-control-label text-muted col-sm-4" htmlFor="year">Year</label>
                    </div>

                    <div className="form-group row ">
                        <label className="form-control-label text-muted col-sm-4" htmlFor="body">Body</label>
                    </div>

                    <div className="form-group row ">
                        <label className="form-control-label text-muted col-sm-4" htmlFor="seats">Seats</label>
                    </div>

                    <div className="form-group row ">
                        <label className="form-control-label text-muted col-sm-4" htmlFor="photo">Photo</label>
                    </div>
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