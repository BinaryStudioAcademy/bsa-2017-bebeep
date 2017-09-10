import React from 'react';
import {getTranslate} from 'react-localize-redux';
import {connect} from 'react-redux';

class TransferDropDown extends React.Component {
    render() {
        const { value, translate, onChange} = this.props;

        return (
            <div className="filter__prop">
                <div className="filter__prop-control">
                    <div className="filter__prop-sign">
                        {translate('search_result.transfer')}
                    </div>

                    <select name="transfer" value={value || ''} className="form-control" id="transfer" onChange={onChange}>
                        <option value="false">{translate('search_result.transfer1')}</option>
                        <option value="true">{translate('search_result.transfer2')}</option>
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