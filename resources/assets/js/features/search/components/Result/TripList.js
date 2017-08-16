import React from 'react';
import { connect } from 'react-redux';
import { search } from '../../../../app/services/TripService';
import TripItem from './TripItem';
import Pagination from './Pagination';
import { withRouter, browserHistory, Link } from 'react-router';
import '../../styles/trip-list.scss';

class TripList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tripsList: {
                data: [],
                size: 0
            },
            errors: {},
            limit: 10,
            page: parseInt(props.location.query.page) || 1,
            sort: props.location.query.sort === 'price' ? 'price' : 'start_at',
            order: props.location.query.order === 'desc' ? 'desc' : 'asc',
            preloader: true,
        };
        this.getData(props, this.state);
    }

    getData({tripData}, {limit, page, sort, order}) {
        search(tripData, page, sort, order, limit)
            .then(response => {
                this.setState({ tripsList: response.data, preloader: false });
            })
            .catch(error => this.setState({ errors: error.response, preloader: false }));
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (
            nextState.page !== this.state.page
            ||
            nextState.sort !== this.state.sort
            ||
            nextState.order !== this.state.order
            ||
            nextProps.tripData != this.props.tripData
        ) {
            nextState.preloader = true;
            this.getData(nextProps, nextState);
        }
        return true;
    }

    setSort(field) {
        if (this.state.sort === field) {
            this.toggleOrderSort();
        } else {
            const sort = {sort: field};
            this.setState(sort);
            this.setUrl(sort);
        }
    }

    toggleOrderSort() {
        const order = {order: this.state.order === 'asc' ? 'desc' : 'asc'};
        this.setState(order);
        this.setUrl(order);
    }

    setUrl(param = {}) {
        const {pathname, query} = this.props.location;
        const params = Object.assign(query, param);
        let newQuery = [];
        for (let key in params) {
            newQuery.push(`${key}=${params[key]}`);
        }
        browserHistory.replace(`${pathname}?${newQuery.join('&')}`);
    }

    render() {
        const { tripsList, limit, page, sort, order, preloader } = this.state;
        const countPage = tripsList.size / limit || 1;
        const currentPage = page > countPage ? Math.ceil(countPage) : (page < 1 ? 1 : page);
        const preload = preloader
            ? (<div className="trip-list__preloader"><i className="fa fa-circle-o-notch fa-spin fa-4x fa-fw" /></div>)
            : '';
        const notFoundMessage = tripsList.data.length === 0 ? (
                <div className="d-flex justify-content-center trip-list__not-found">
                    <span className="align-self-center">Trips not found ...</span>
                </div>
            ) : '';
        return (
            <div className="trip-list container">
                <div className="row trip-list__header">
                    <div className="col-8 align-self-center">
                        Found trips: {tripsList.size}
                    </div>
                    <div className="trip-list__sort-container col-4">
                        <a href="#sort/price"
                           onClick={e => { e.preventDefault(); this.setSort('price') }}
                           className={"trip-list__sort" + (sort === 'price' ? " trip-list__sort_active" : '') + (order === 'asc' ? " trip-list__sort_asc" : "")}
                        >Price</a>
                        <a href="#sort/start"
                           onClick={e => { e.preventDefault(); this.setSort('start_at') }}
                           className={"trip-list__sort" + (sort === 'start_at' ? " trip-list__sort_active" : '') + (order === 'asc' ? " trip-list__sort_asc" : "")}
                        >Date</a>
                    </div>
                </div>
                <div className="trip-list__item-container">
                    {preload}
                    {notFoundMessage}
                    {tripsList.data.map((trip) =>
                        <Link key={trip.id}  to={`/trip/${trip.id}`} className="trip-list__item-link">
                            <TripItem trip={trip} />
                        </Link>
                    )}
                </div>
                <div className="row trip-list__pagination">
                    <div className="col-sm-6 align-self-center">
                        Showing {(currentPage - 1) * limit + tripsList.data.length} of {tripsList.size}
                    </div>
                    <div className="col-sm-6">
                        <Pagination
                            isDisabled={preloader}
                            size={tripsList.size}
                            page={currentPage}
                            limit={limit}
                            onChangePage={(page) => {
                                this.setState({page: page});
                                this.setUrl({page})
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const TripListConnected = connect(
    (state) => ({
        tripData: state.search
    })
)(TripList);

export default withRouter(TripListConnected);