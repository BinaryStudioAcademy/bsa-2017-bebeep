import React from 'react';

export class FilterSelect extends React.Component {
    render() {
        const {title, value, id, name, onChange} = this.props;

        return (
                <div className="filter__prop">
                    <div className="filter__prop-control">
                        <div className="filter__prop-name subscribe-modal-name">
                            {title}
                        </div>
                        <select name={name} value={value || ''} className="form-control" id={id} onChange={onChange}>
                            {this.props.children}
                        </select>
                    </div>
                </div>
        );
    }
}
