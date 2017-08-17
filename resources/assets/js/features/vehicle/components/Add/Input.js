import React from 'React';

class Input extends React.Component {
    render() {
        return (
            <div className={"form-group row " + (this.props.error ? 'has-danger' : '')} >
                <label className="form-control-label text-muted col-sm-4"
                       htmlFor={ this.props.id }>{ this.props.children }</label>
                <div className="col-sm-8">
                    <input type={ this.props.type || 'text' }
                           className={"form-control " + (this.props.error ? 'form-control-danger' : '')}
                           id={ this.props.id }
                           name={ this.props.name }
                           required={ this.props.required }
                           onChange={ this.props.onChange }
                    />
                    <div className="form-control-feedback">{ this.props.error }</div>
                </div>
            </div>
        );
    }
}

export default Input;