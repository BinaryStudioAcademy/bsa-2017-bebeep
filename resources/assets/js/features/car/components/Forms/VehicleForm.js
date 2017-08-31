import React from 'react';
import Select from 'react-select';
import NumericInput from 'react-numeric-input';
import { localize } from 'react-localize-redux';

import LangService from 'app/services/LangService';
import * as lang from 'features/car/lang/VehicleForm.locale.json';

class VehicleForm extends React.Component {
    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {translate} = this.props;
        const { errors } = this.props;
        const currentYear = new Date().getFullYear();

        return (
            <form role="form" className="card vehicle-form" method="POST" onSubmit={ this.props.onSubmit }>
                <div className="card-header">
                    { translate('vehicle_form.enter_vehicle_details') }
                </div>
                <div className="card-block">
                    <div className={ "form-group row " + (errors.brand ? 'has-danger' : '') }>
                        <label className="form-control-label text-muted col-sm-4" htmlFor="brand">{ translate('vehicle_form.car_brand') }</label>
                        <Select.Async
                            name="brand"
                            placeholder={ translate('vehicle_form.car_brand_placeholder') }
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
                        <label className="form-control-label text-muted col-sm-4" htmlFor="model">{ translate('vehicle_form.car_model') }</label>
                        <Select.Async
                            name="model"
                            placeholder={ translate('vehicle_form.car_model_placeholder') }
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
                        <label className="form-control-label text-muted col-sm-4" htmlFor="color">{ translate('vehicle_form.car_color') }</label>
                        <Select.Async
                            name="color"
                            placeholder={ translate('vehicle_form.car_color_placeholder') }
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
                        <label className="form-control-label text-muted col-sm-4" htmlFor="body">{ translate('vehicle_form.car_body') }</label>
                        <Select.Async
                            name="body"
                            placeholder={ translate('vehicle_form.car_body_placeholder') }
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
                        <label className="form-control-label text-muted col-sm-4" htmlFor="year">{ translate('vehicle_form.car_year') }</label>
                        <div className="col-sm-8">
                            <NumericInput className="form-control"
                                          name="year"
                                          placeholder={ translate('vehicle_form.car_year_placeholder') }
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
                        <label className="form-control-label text-muted col-sm-4" htmlFor="seats">{ translate('vehicle_form.car_seats') }</label>
                        <div className="col-sm-8">
                            <NumericInput className="form-control"
                                          name="seats"
                                          placeholder={ translate('vehicle_form.car_seats_placeholder') }
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
                            { translate('vehicle_form.btn_save') }
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

export default localize(VehicleForm, 'locale');
