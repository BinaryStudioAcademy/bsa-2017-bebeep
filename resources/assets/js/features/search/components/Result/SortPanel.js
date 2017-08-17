import React from 'react';

class SortPanel extends React.Component {
    render() {
        const { sort, order, onChange } = this.props;
        return (
            <span>
                <a href="#sort/price"
                   onClick={e => { e.preventDefault(); onChange('price') }}
                   className={"trip-list__sort" + (sort === 'price' ? " trip-list__sort_active" : '') + (order === 'asc' ? " trip-list__sort_asc" : "")}
                >Price</a>
                <a href="#sort/start"
                   onClick={e => { e.preventDefault(); onChange('start_at') }}
                   className={"trip-list__sort" + (sort === 'start_at' ? " trip-list__sort_active" : '') + (order === 'asc' ? " trip-list__sort_asc" : "")}
                >Date</a>
            </span>
        );
    }
}

export default SortPanel;