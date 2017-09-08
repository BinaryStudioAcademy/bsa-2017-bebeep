import React from 'react';
import {getTranslate} from 'react-localize-redux';
import {connect} from 'react-redux';

class SeatsDropDown extends React.Component {
    render() {
        const { value, translate, onChange} = this.props;

        return (
                <div className="filter__prop">
                    <div className="filter__prop-control">
                        <div className="filter__prop-name subscribe-modal-name">
                            {translate('subscriptions.free_seats')}
                        </div>
                        <select name="seats" value={value || ''} className="form-control" id="seats" onChange={onChange}>
                            <option value="">{translate('subscriptions.not_important')}</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">{translate('subscriptions.more')}4</option>
                        </select>
                    </div>
                </div>
        );
    }
}

export default connect(
    state => ({
        translate: getTranslate(state.locale)
    })
)(SeatsDropDown);
