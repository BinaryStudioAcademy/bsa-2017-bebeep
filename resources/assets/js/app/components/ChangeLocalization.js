import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import LangService from '../services/LangService';

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
        const currentLanguage = LangService.getActiveLanguage(),
            languages = LangService.languages;

        return (
            <Dropdown className="main-navigation-dropdown language-switcher"
                isOpen={ this.state.isDropdownOpen }
                toggle={ this.toggleLangDropdown }
            >
                <DropdownToggle className="main-navigation-dropdown__dropdown-toggle" caret>
                    <i className="fa fa-language language-switcher__icon" aria-hidden="true" />
                    <span className="main-navigation-dropdown__toggle-label">
                        { currentLanguage.toUpperCase() }
                    </span>
                </DropdownToggle>
                <DropdownMenu right>
                    {languages.map((lang) =>
                        <div key={ lang }
                            className="dropdown-item"
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
