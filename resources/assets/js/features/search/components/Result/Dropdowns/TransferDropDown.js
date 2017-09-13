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
                        <option value="1">{translate('dropdown.transfer.with1')}</option>
                        <option value="2">{translate('dropdown.transfer.with2')}</option>
                        <option value="3">{translate('dropdown.transfer.with3')}</option>
                        <option value="4">{translate('dropdown.transfer.with4')}</option>
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
