import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setActiveLanguage, getActiveLanguage, getLanguages} from 'react-localize-redux';

class ChangeLocalization extends React.Component {
    constructor() {
        super();
        this.onSetLanguage = this.onSetLanguage.bind(this);
    }

    onSetLanguage(e) {
        const langCode = e.target.value;
        setActiveLanguage(langCode);
    }

    render() {

        const {languages, setActiveLanguage, currentLanguage} = this.props;
        return (
            <select className="form-control"
                defaultValue={currentLanguage}
                onChange={this.onSetLanguage}>
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