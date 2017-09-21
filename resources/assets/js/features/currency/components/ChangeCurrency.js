import React from 'react';
import { connect } from 'react-redux';
import { localize } from 'react-localize-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import CurrencyService from '../services/CurrencyService';

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
        const { translate, activeCurrency } = this.props,
            currencies = CurrencyService.currencies;

        return (
            <Dropdown className="header-menu__dropdown header-currencies-menu"
                isOpen={this.state.isDropdownOpen}
                toggle={this.toggleDropdown}
            >
                <DropdownToggle caret>
                    <span className="header-currencies-menu__currency-active">
                        {activeCurrency.sign}
                    </span>
                </DropdownToggle>

                <DropdownMenu right>
                    {currencies.map((currency) =>
                        <div key={currency.code}
                            className="dropdown-item cursor-pointer"
                            onClick={() => this.onSetCurrency(currency.code)}
                        >
                            {translate(`currency.name.${currency.code}`)}
                        </div>
                    )}
                </DropdownMenu>
            </Dropdown>
        );
    }
}

const ChangeCurrencyConnected = connect(
    state => ({
        activeCurrency: state.currency.activeCurrency,
    }),
    null,
)(ChangeCurrency);

export default localize(ChangeCurrencyConnected, 'locale');
