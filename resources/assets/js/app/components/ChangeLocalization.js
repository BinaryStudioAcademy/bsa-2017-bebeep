import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

<<<<<<< HEAD:resources/assets/js/app/components/MenuDropdowns/ChangeLocalization.js
import { LocalizationIcon } from './Icons';

import LangService, { LANG_PROP_SHORT_NAME } from 'app/services/LangService';
=======
import LangService, { LANG_PROP_SHORT_NAME } from '../services/LangService';
>>>>>>> parent of a8a52b02... Added MenuDropdowns dir, moved dropdowns into it:resources/assets/js/app/components/ChangeLocalization.js

class ChangeLocalization extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isDropdownOpen: false,
        };

        this.toggleLangDropdown = this.toggleLangDropdown.bind(this);
        this.onSetLanguage = this.onSetLanguage.bind(this);
    }

    toggleLangDropdown() {
        this.setState({
            isDropdownOpen: !this.state.isDropdownOpen,
        });
    }

    onSetLanguage(langCode) {
        LangService.setActiveLanguage(langCode);
        this.toggleLangDropdown();
    }

    render() {
        const currentLanguage = LangService.getActiveLanguage(LANG_PROP_SHORT_NAME),
            languages = LangService.languages;

        return (
            <Dropdown className="header-menu__dropdown header-locales-menu"
                isOpen={ this.state.isDropdownOpen }
                toggle={ this.toggleLangDropdown }
            >
                <DropdownToggle caret>
                    <div className="header-locales-menu__locale-icon">
                        <LocalizationIcon />
                    </div>
                    <span>{currentLanguage.toUpperCase()}</span>
                </DropdownToggle>

                <DropdownMenu right>
                    {languages.map((lang) =>
                        <div key={ lang }
                            className="dropdown-item cursor-pointer"
                            onClick={ () => this.onSetLanguage(lang) }
                        >
                            { LangService.getName(lang) }
                        </div>

                    )}
                </DropdownMenu>
            </Dropdown>
        );
    }
}

export default ChangeLocalization;
