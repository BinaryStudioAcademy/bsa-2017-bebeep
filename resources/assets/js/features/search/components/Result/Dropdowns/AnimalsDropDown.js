import React from 'react';
import {getTranslate} from 'react-localize-redux';
import {connect} from 'react-redux';

class AnimalsDropDown extends React.Component {
    render() {
        const { value, translate, onChange} = this.props;

        return (
                <div className="filter__prop">
                    <div className="filter__prop-control">
                        <div className="filter__prop-name subscribe-modal-name">
                            {translate('search_result.animals')}
                        </div>
                        <select name="animals" value={value || ''} className="form-control" id="animals" onChange={onChange}>
                            <option value="">{translate('search_result.not_important')}</option>
                            <option value="1">{translate('search_result.allowed')}</option>
                            <option value="0">{translate('search_result.forbidden')}</option>
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
)(AnimalsDropDown);
