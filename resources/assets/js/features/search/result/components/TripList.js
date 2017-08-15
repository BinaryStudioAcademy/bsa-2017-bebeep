import React from 'react';
import { connect } from 'react-redux';
import { search } from '../../../../app/services/TripService';
import TripItem from './TripItem';
import Pagination from './Pagination';

class TripList extends React.Component {

    constructor() {
        super();
        this.state = {
            tripsList: {
                data: [],
                size: 0
            },
            errors: {},
            limit: 10,
            page: 1,
            sort: 'price',
            order: 'asc'
        };
    }

    getData({limit, page, sort, order}) {
        search(this.props.tripData, page, sort, order, limit)
            .then(response => this.setState({ tripsList: response.data }))
            .catch(error => this.setState({ errors: error.response }));
    }

    componentWillMount() {
        this.getData(this.state);
    }

    componentWillReceiveProps(nextProps) {
        this.getData(this.state);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (
            nextState.page !== this.state.page
            ||
            nextState.sort !== this.state.sort
            ||
            nextState.order !== this.state.order
        ) {
            this.getData(nextState);
        }
        return true;
    }

    setSort(field) {
        if (this.state.sort === field) {
            this.toggleOrderSort();
        } else {
            this.setState({sort: field});
        }
    }

    toggleOrderSort() {
        this.setState({order: this.state.order === 'asc' ? 'desc' : 'asc'});
    }

    render() {
        const { tripsList, limit, page, sort, order } = this.state;

        return (
            <div className="trip-list-container">
                <div className="trip-list__sort-row">
                    <a href="#sort/price"
                       onClick={e => { this.setSort('price') }}
                       className={"trip-list__sort" + (sort === 'price' ? " trip-list__sort_active" : '') + (order === 'asc' ? " trip-list__sort_asc" : "")}
                    >Price</a>
                    <a href="#sort/start"
                       onClick={e => { this.setSort('start_at') }}
                       className={"trip-list__sort" + (sort === 'start_at' ? " trip-list__sort_active" : '') + (order === 'asc' ? " trip-list__sort_asc" : "")}
                    >Date</a>
                </div>
                <div className="trip-list">
                    {tripsList.data.map((trip) =>
                        <TripItem key={trip.id} trip={trip} />
                    )}
                </div>
                <Pagination
                    size={tripsList.size}
                    page={page}
                    limit={limit}
                    onChangePage={(page) => this.setState({page: page})}
                />
            </div>
        )
    }
}

const TripListConnected = connect(
    (state) => ({
        tripData: state.search
    })
)(TripList);

export default TripListConnected;