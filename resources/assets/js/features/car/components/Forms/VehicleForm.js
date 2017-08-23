import React from 'react';
import Select from 'react-select';
import NumericInput from 'react-numeric-input';

export default class VehicleForm extends React.Component {
    render() {
        const { errors } = this.props;
        const currentYear = new Date().getFullYear();

        return (
            <form role="form" className="card vehicle-form" method="POST" onSubmit={ this.props.onSubmit }>
                <div className="card-header">
                    Enter vehicle details
                </div>
                <div className="card-block">
                    <div className={ "form-group row " + (errors.brand ? 'has-danger' : '') }>
                        <label className="form-control-label text-muted col-sm-4" htmlFor="brand">Car Brand</label>
                        <Select.Async
                            name="brand"
                            placeholder="Select Car Brand"
                            value={ this.props.brand.name }
                            valueKey="name"
                            labelKey="name"
                            className={ "col-sm-8 " + (errors.brand ? 'form-control-danger' : '')}
                            loadOptions={ this.props.getBrandOptions }
                            onChange={ this.props.handleBrandChange }
                            clearable={ true }
                        />
                        <div className="offset-sm-4 col-sm-8">
                            <div className="form-control-feedback">{ errors.brand }</div>
                        </div>
                    </div>

                    <div className={ "form-group row " + (errors.model ? 'has-danger' : '') }>
                        <label className="form-control-label text-muted col-sm-4" htmlFor="model">Car Model</label>
                        <Select.Async
                            name="model"
                            placeholder="Please Type Car-model..."
                            value={this.props.model.name}
                            valueKey="name"
                            labelKey="name"
                            className={ "col-sm-8 " + (errors.model ? 'form-control-danger' : '')}
                            disabled={this.props.model.disabled}
                            loadOptions={ this.props.getModelLoadOptions }
                            onChange={this.props.handleModelChange}
                            cache={false}
                            autoload={false}
                            clearable={true}
                        />
                        <div className="offset-sm-4 col-sm-8">
                            <div className="form-control-feedback">{ errors.model }</div>
                        </div>
                    </div>

                    <div className={ "form-group row " + (errors.color ? 'has-danger' : '') }>
                        <label className="form-control-label text-muted col-sm-4" htmlFor="color">Color</label>
                        <Select.Async
                            name="color"
                            placeholder="Select Car Color"
                            value={this.props.color.color}
                            valueKey="color"
                            labelKey="color"
                            className={ "col-sm-8 " + (errors.color ? 'form-control-danger' : '')}
                            loadOptions={ this.props.getColorOptions }
                            onChange={this.props.handleColorChange}
                            clerable={true}
                        />
                        <div className="offset-sm-4 col-sm-8">
                            <div className="form-control-feedback">{ errors.color }</div>
                        </div>
                    </div>

                    <div className={ "form-group row " + (errors.body ? 'has-danger' : '') }>
                        <label className="form-control-label text-muted col-sm-4" htmlFor="body">Body</label>
                        <Select.Async
                            name="body"
                            placeholder="Select Car Body Type"
                            value={this.props.body.body}
                            valueKey="body"
                            labelKey="body"
                            className={ "col-sm-8 " + (errors.body ? 'form-control-danger' : '')}
                            loadOptions={ this.props.getBodyOptions }
                            onChange={this.props.handleBodyChange}
                            clerable={true}
                        />
                        <div className="offset-sm-4 col-sm-8">
                            <div className="form-control-feedback">{ errors.body }</div>
                        </div>
                    </div>

                    <div className={ "form-group row " + (errors.year ? 'has-danger' : '') }>
                        <label className="form-control-label text-muted col-sm-4" htmlFor="year">Year</label>
                        <div className="col-sm-8">
                            <NumericInput className="form-control"
                                          name="year"
                                          placeholder="Select Car Year"
                                          min={1980}
                                          max={this.currentYear}
                                          value={this.props.year}
                                          onChange={this.props.handleYearChange}
                            />
                            <div className="offset-sm-4 col-sm-8">
                                <div className="form-control-feedback">{ errors.year }</div>
                            </div>
                        </div>
                    </div>

                    <div className={ "form-group row " + (errors.seats ? 'has-danger' : '') }>
                        <label className="form-control-label text-muted col-sm-4" htmlFor="seats">Seats</label>
                        <div className="col-sm-8">
                            <NumericInput className="form-control"
                                          name="seats"
                                          placeholder="Select Seats Count"
                                          min={1}
                                          max={8}
                                          value={this.props.seats}
                                          onChange={this.props.handleSeatsChange}
                            />
                        </div>
                        <div className="offset-sm-4 col-sm-8">
                            <div className="form-control-feedback">{ errors.seats }</div>
                        </div>
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