import React from 'react';

class Textarea extends React.Component {
    render() {
        return (
            <div className={"form-group row " + (this.props.error ? 'has-danger' : '')} >
                <label className="form-control-label text-muted col-sm-4"
                       htmlFor={ this.props.id }>{ this.props.children }</label>
                <div className="col-sm-8">
                    <textarea className={"form-control " + (this.props.error ? 'form-control-danger' : '')}
                        name={ this.props.name }
                        id={ this.props.id }
                        cols="30"
                        rows="10"
                        value={ this.props.value }
                        defaultValue={ this.props.defaultValue }
                        required={ this.props.required }
                        onChange={ this.props.onChange }
                    ></textarea>
                    <div className="form-control-feedback">{ this.props.error }</div>
                </div>
            </div>
        );
    }
}

export default Textarea;
