import React from 'react';
import { localize } from 'react-localize-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import CurrencyService, { CURRENCY_PROP_SIGN } from '../services/CurrencyService';

import LangService from 'app/services/LangService';
import * as lang from '../lang/currency.locale.json';

import '../styles/currency-dropdown.scss';

class ChangeCurrency extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isDropdownOpen: false,
        };

        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.onSetCurrency = this.onSetCurrency.bind(this);
    }

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    toggleDropdown() {
        this.setState({
            isDropdownOpen: !this.state.isDropdownOpen,
        });
    }

    onSetCurrency(code) {
        CurrencyService.setActiveCurrency(code);
        this.toggleDropdown();
    }

    render() {
        const { translate } = this.props,
            currentCurrency = CurrencyService.getActiveCurrency(CURRENCY_PROP_SIGN),
            currencies = CurrencyService.currencies;

        return (
            <Dropdown className="header-menu__dropdown header-currencies-menu"
                isOpen={ this.state.isDropdownOpen }
                toggle={ this.toggleDropdown }
            >
                <DropdownToggle caret>
                    <span className="header-currencies-menu__currency-active">
                        {currentCurrency.toUpperCase()}
                    </span>
                </DropdownToggle>

                <DropdownMenu right>
                    {currencies.map((code) =>
                        <div key={ code }
                            className="dropdown-item cursor-pointer"
                            onClick={ () => this.onSetCurrency(code) }
                        >
                            {translate(`currency.name.${code}`)}
                        </div>
                    )}
                </DropdownMenu>
            </Dropdown>
        );
    }
}

export default localize(ChangeCurrency, 'locale');
