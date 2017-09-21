import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import LangService from 'app/services/LangService';
import * as lang from 'features/currency/lang/currency.locale.json';

class CurrencyDropDown extends React.Component {
    constructor() {
        super();

        this.state = {
            isOpen: false
        };

        this.toggle = this.toggle.bind(this);
    }

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const {translate, currencies, currency, onChange} = this.props;

        return (
            <Dropdown group isOpen={this.state.isOpen} size="sm" toggle={this.toggle}>
                <DropdownToggle caret>
                    {currency.sign}
                </DropdownToggle>
                <DropdownMenu right>
                    {currencies.map((cur) => {
                        return (
                            <DropdownItem
                                key={cur.id}
                                data-value={cur.id}
                                onClick={onChange}
                            >{translate(`currency.name.${cur.code}`)}</DropdownItem>
                        );
                    })}
                </DropdownMenu>
            </Dropdown>
        );
    }
}

CurrencyDropDown.PropTypes = {
    onChange: PropTypes.func,
    currency: PropTypes.object
};

export default connect(
    state => ({
        currencies: state.currency.currencies,
        translate: getTranslate(state.locale)
    }),
    dispatch => bindActionCreators({}, dispatch)
)(CurrencyDropDown);
