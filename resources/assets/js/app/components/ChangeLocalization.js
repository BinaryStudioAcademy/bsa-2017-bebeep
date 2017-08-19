import React from 'react';
import LangService from '../services/LangService';

class ChangeLocalization extends React.Component {
    constructor() {
        super();
        this.onSetLanguage = this.onSetLanguage.bind(this);
    }

    onSetLanguage(e) {
        const langCode = e.target.value;
        LangService.setActiveLanguage(langCode);
    }

    render() {

        const
            currentLanguage = LangService.getActiveLanguage(),
            languages = LangService.languages;

        return (
            <select className="form-control"
                defaultValue={currentLanguage}
                onChange={this.onSetLanguage}>
                {languages.map((lang) =>
                    <option key={lang} value={lang}>{lang}</option>
                )}
            </select>
        );
    }
}

export default ChangeLocalization;