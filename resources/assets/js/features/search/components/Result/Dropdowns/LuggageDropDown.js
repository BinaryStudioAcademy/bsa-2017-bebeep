import React from 'react';
import {getTranslate} from 'react-localize-redux';
import {connect} from 'react-redux';

class LuggageDropDown extends React.Component {
    render() {
        const { value, translate, onChange} = this.props;

        return (
                <div className="filter__prop">
                    <div className="filter__prop-control">
                        <div className="filter__prop-name subscribe-modal-name">
                            {translate('search_result.luggage_size')}
                        </div>
                        <select name="luggage" value={value || ''} className="form-control" id="luggage" onChange={onChange}>
                            <option value="">{translate('search_result.not_important')}</option>
                            <option value="0">{translate('search_result.luggage_size_0')}</option>
                            <option value="1">{translate('search_result.luggage_size_1')}</option>
                            <option value="2">{translate('search_result.luggage_size_2')}</option>
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
)(LuggageDropDown);
