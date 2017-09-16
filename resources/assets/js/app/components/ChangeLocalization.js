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
            <Dropdown className="header-menu__dropdown header-locales-menu"
                isOpen={ this.state.isDropdownOpen }
                toggle={ this.toggleLangDropdown }
            >
                <DropdownToggle caret>
                    <div className="header-locales-menu__locale-icon">
                        <svg className="header-locales-menu__locale-icon-item" viewBox="0 0 48 48"><path d="M23.99 4c-11.05 0-19.99 8.95-19.99 20s8.94 20 19.99 20c11.05 0 20.01-8.95 20.01-20s-8.96-20-20.01-20zm13.85 12h-5.9c-.65-2.5-1.56-4.9-2.76-7.12 3.68 1.26 6.74 3.81 8.66 7.12zm-13.84-7.93c1.67 2.4 2.97 5.07 3.82 7.93h-7.64c.85-2.86 2.15-5.53 3.82-7.93zm-15.48 19.93c-.33-1.28-.52-2.62-.52-4s.19-2.72.52-4h6.75c-.16 1.31-.27 2.64-.27 4 0 1.36.11 2.69.28 4h-6.76zm1.63 4h5.9c.65 2.5 1.56 4.9 2.76 7.13-3.68-1.26-6.74-3.82-8.66-7.13zm5.9-16h-5.9c1.92-3.31 4.98-5.87 8.66-7.13-1.2 2.23-2.11 4.63-2.76 7.13zm7.95 23.93c-1.66-2.4-2.96-5.07-3.82-7.93h7.64c-.86 2.86-2.16 5.53-3.82 7.93zm4.68-11.93h-9.36c-.19-1.31-.32-2.64-.32-4 0-1.36.13-2.69.32-4h9.36c.19 1.31.32 2.64.32 4 0 1.36-.13 2.69-.32 4zm.51 11.12c1.2-2.23 2.11-4.62 2.76-7.12h5.9c-1.93 3.31-4.99 5.86-8.66 7.12zm3.53-11.12c.16-1.31.28-2.64.28-4 0-1.36-.11-2.69-.28-4h6.75c.33 1.28.53 2.62.53 4s-.19 2.72-.53 4h-6.75z"/></svg>
                    </div>
                    <span>{currentLanguage.toUpperCase()}</span>
                </DropdownToggle>
                <DropdownMenu right>
                    {languages.map((lang) =>
                        <div key={ lang }
                            className="dropdown-item header-locales-menu__locale"
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
