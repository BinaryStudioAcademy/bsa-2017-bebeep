import React from 'react';
import Filter from './Filter';
import SearchForm from './SearchForm';
import TripList from './TripList';
import SortPanel from './SortPanel';
import Pagination from './Pagination';
import { connect } from 'react-redux';
import { search } from '../../../../app/services/TripService';
import { withRouter, browserHistory } from 'react-router';

class Result extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            collection: [],
            meta: {
                totalSize: 0
            },
            preloader: false,
            sort: props.location.query.sort || 'price',
            order: props.location.query.order || 'asc',
            page: +props.location.query.page || 1,
            limit: 10,
            errors: {}
        };

        this.onChangeSort = this.onChangeSort.bind(this);
        this.onChangePage = this.onChangePage.bind(this);

        this.getData(props, this.state);
    }

    onChangePage(page) {
        this.setState({page});
        this.setUrl({page})
    }

    onChangeSort(sort) {
        if (sort === this.state.sort) {
            const order = this.state.order === 'asc' ? 'desc' : 'asc';
            this.setState({order});
            this.setUrl({order});
        } else {
            this.setState({sort});
            this.setUrl({sort});
        }
    }

    getData({tripData}, {limit, page, sort, order}) {
        search(tripData, page, sort, order, limit)
            .then(response => {
                this.setState({
                    collection: response.data.data,
                    meta: {totalSize: response.data.size},
                    preloader: false
                });
            })
            .catch(error => this.setState({
                errors: error.response,
                preloader: false
            }));
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

    getCurrentPage(page, limit, totalSize) {
        const countPage = totalSize / limit || 1;
        return page > countPage ? Math.ceil(countPage) : (page < 1 ? 1 : page);
    }

    countResult(currentPage, lengthData, limit) {
        return (currentPage - 1) * limit + lengthData;
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

    render() {
        const {sort, order, page, limit, meta, collection, preloader} = this.state,
            currentPage = this.getCurrentPage(page, limit, meta.totalSize),
            countResult = this.countResult(currentPage, collection.length, limit);

        return (
            <div>
                <SearchForm />
                <div className="row">
                    <div className="col-md-3">
                        <Filter />
                    </div>
                    <div className="col-md-9">
                        <div className="trip-list container">
                            <div className="row trip-list__header">
                                <div className="col-8 align-self-center">
                                    Found trips: {meta.totalSize}
                                </div>
                                <div className="trip-list__sort-container col-4">
                                    <SortPanel
                                        sort={sort}
                                        order={order}
                                        onChange={ this.onChangeSort }
                                    />
                                </div>
                            </div>
                            <div className="trip-list__item-container">
                                <TripList
                                    collection={collection}
                                    preloader={preloader}
                                />
                            </div>
                            <div className="row trip-list__pagination">
                                <div className="col-sm-6 align-self-center">
                                    Showing {countResult} of {meta.totalSize}
                                </div>
                                <div className="col-sm-6">
                                    <Pagination
                                        isDisabled={preloader}
                                        size={meta.totalSize}
                                        page={currentPage}
                                        limit={limit}
                                        onChangePage={this.onChangePage}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const ResultConnected = connect(
    (state) => ({
        tripData: state.search
    })
)(Result);
export default withRouter(ResultConnected);