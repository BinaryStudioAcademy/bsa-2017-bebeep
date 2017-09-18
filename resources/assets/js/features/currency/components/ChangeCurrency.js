import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import CurrencyIcon from './CurrencyIcon';
import CurrencyService, { CURRENCY_PROP_SHORT_NAME } from '../services/CurrencyService';

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
        const currentCurrency = CurrencyService.getActiveCurrency(CURRENCY_PROP_SHORT_NAME),
            currencies = CurrencyService.currencies;

        return (
            <Dropdown className="header-menu__dropdown header-currencies-menu"
                isOpen={ this.state.isDropdownOpen }
                toggle={ this.toggleDropdown }
            >
                <DropdownToggle caret>
                    <div className="header-currencies-menu__currency-icon">
                        <CurrencyIcon />
                    </div>
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
                            { CurrencyService.getName(code) }
                        </div>

                    )}
                </DropdownMenu>
            </Dropdown>
        );
    }
}

export default ChangeCurrency;
