import React from 'react';
import {getTranslate} from 'react-localize-redux';
import {connect} from 'react-redux';
import LangService from 'app/services/LangService';
import * as lang from 'features/search/lang/SearchResult.locale.json';

class AnimalsDropDown extends React.Component {
    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const { value, translate, onChange} = this.props;

        return (
                <div className="filter__prop">
                    <div className="filter__prop-control">
                        <div className="filter__prop-name subscribe-modal-name">
                            {translate('dropdown.animals.name')}
                        </div>
                        <select name="animals" value={value || ''} className="form-control" id="animals" onChange={onChange}>
                            <option value="">{translate('dropdown.not_important')}</option>
                            <option value="1">{translate('dropdown.animals.allowed')}</option>
                            <option value="0">{translate('dropdown.animals.forbidden')}</option>
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
