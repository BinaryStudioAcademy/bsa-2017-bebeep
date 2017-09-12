import React from 'react';
import {getTranslate} from 'react-localize-redux';
import {connect} from 'react-redux';

class TransferDropDown extends React.Component {
    render() {
        const { value, translate, onChange} = this.props;

        return (
            <div className="filter__prop">
                <div className="filter__prop-control">
                    <div className="filter__prop-name subscribe-modal-name">
                        {translate('dropdown.transfer.name')}
                    </div>

                    <select name="transfer" value={value || ''} className="form-control" id="transfer" onChange={onChange}>
                        <option value="false">{translate('dropdown.transfer.without')}</option>
                        <option value="true">{translate('dropdown.transfer.with')}</option>
                    </select>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        translate: getTranslate(state.locale)
    })
)(TransferDropDown);
