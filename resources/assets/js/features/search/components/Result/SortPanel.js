import React from 'react';
import {localize} from 'react-localize-redux';
import 'features/search/styles/search-sort.scss';

class SortPanel extends React.Component {
    render() {
        const { sort, order, onChange, translate } = this.props;
        return (
            <span>
                <a href="#sort/price"
                   onClick={e => { e.preventDefault(); onChange('price') }}
                   className={"search-sort" + (sort === 'price' ? " search-sort_active" : '') + (order === 'asc' ? " search-sort_asc" : "")}
                >{translate('price')}</a>
                <a href="#sort/start"
                   onClick={e => { e.preventDefault(); onChange('start_at') }}
                   className={"search-sort" + (sort === 'start_at' ? " search-sort_active" : '') + (order === 'asc' ? " search-sort_asc" : "")}
                >{translate('date')}</a>
            </span>
        );
    }
}

export default localize(SortPanel, 'locale');
