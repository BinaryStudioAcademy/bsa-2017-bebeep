import React from 'react';
import Filter from './Filter';
import SearchForm from './SearchForm';
import TripList from './TripList';
import SortPanel from './SortPanel';
import Pagination from './Pagination';
import { connect } from 'react-redux';
import { search, encodeCoord, getDataFromQuery, setUrl, setFilter} from '../../services/SearchService';
import { searchResult } from '../../actions';
import { bindActionCreators } from 'redux';
import { withRouter, browserHistory } from 'react-router';

class Result extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            collection: [],
            meta: {
                totalSize: 0,
                priceRange: [0,0]
            },
            preloader: true,
            sort: props.location.query.sort || 'price',
            order: props.location.query.order || 'asc',
            page: +props.location.query.page || 1,
            limit: 10,
            filter: {},
            resetFilter: false,
            errors: {}
        };

        this.onChangeSort = this.onChangeSort.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.onChangeFilter = this.onChangeFilter.bind(this);
    }

    componentWillMount() {
        const newTripData = getDataFromQuery(this.props.tripData);
        if (Object.keys(newTripData).length) {
            this.props.searchResult(newTripData);
        } else {
            this.getData(this.props, this.state);
        }
    }

    onChangePage(page) {
        this.setState({page});
    }

    onChangeSort(sort) {
        if (sort === this.state.sort) {
            const order = this.state.order === 'asc' ? 'desc' : 'asc';
            this.setState({order});
        } else {
            this.setState({sort});
        }
    }

    onChangeFilter(filter) {
        this.setState({filter});
    }

    getData({tripData}, {limit, page, sort, order}, filter) {
        search(tripData, page, sort, order, limit, filter)
            .then(response => {
                this.setState({
                    collection: response.data.collection,
                    meta: {
                        totalSize: response.data.meta.total,
                        priceRange: [
                            response.data.meta.price.min,
                            response.data.meta.price.max
                        ]
                    },
                    preloader: false
                });
            })
            .catch(error => this.setState({
                errors: error.response,
                preloader: false
            }));
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
            nextState.filter !== this.state.filter
            ||
            nextProps.tripData != this.props.tripData
        ) {
            setUrl({
                'fn': nextProps.tripData.from.name,
                'fc': encodeCoord(nextProps.tripData.from.coordinate),
                'tn': nextProps.tripData.to.name,
                'tc': encodeCoord(nextProps.tripData.to.coordinate),
                'start_at': nextProps.tripData.start_at,
                'sort': nextState.sort,
                'order': nextState.order,
                'page': nextState.page,
            });

            nextState.preloader = true;
            // reset filter if choosed new location
            if (nextProps.tripData != this.props.tripData) {
                nextState.filter = {};
                nextState.resetFilter = true;
                this.setState({resetFilter: false});
            }
            this.getData(nextProps, nextState, nextState.filter);
        }
        return true;
    }

    render() {
        const {sort, order, page, limit, meta, collection, preloader, resetFilter} = this.state,
            currentPage = this.getCurrentPage(page, limit, meta.totalSize),
            countResult = this.countResult(currentPage, collection.length, limit);
        return (
            <div>
                <SearchForm />
                <div className="row">
                    <div className="col-md-3">
                        <Filter
                            resetFilter={resetFilter}
                            onChange={this.onChangeFilter}
                            priceBounds={meta.priceRange}
                        />
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
    }),
    (dispatch) => bindActionCreators({searchResult},dispatch)
)(Result);
export default withRouter(ResultConnected);