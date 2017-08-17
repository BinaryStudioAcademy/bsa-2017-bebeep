import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setActiveLanguage, getActiveLanguage, getLanguages} from 'react-localize-redux';

class ChangeLocalization extends React.Component {
    render() {

        const {languages, setActiveLanguage, currentLanguage} = this.props;
        return (
            <select className="form-control"
                defaultValue={currentLanguage}
                onChange={(e) => setActiveLanguage(e.target.value)}>
                {languages.map((lang) =>
                    <option key={lang.code} value={lang.code}>{lang.code}</option>
                )}
            </select>
        );
    }
}

export default connect(
    state => ({
        languages: getLanguages(state.locale),
        currentLanguage: getActiveLanguage(state.locale)
    }),
    dispatch => bindActionCreators({setActiveLanguage }, dispatch)
)(ChangeLocalization);