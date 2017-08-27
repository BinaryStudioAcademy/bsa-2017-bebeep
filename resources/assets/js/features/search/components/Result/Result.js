import React from 'react';
import Filter from './Filter';
import SearchForm from './SearchForm';
import TripList from './TripList';
import Placeholder from './Placeholder';
import SortPanel from './SortPanel';
import Preloader from 'app/components/Preloader';
import { Pagination } from 'app/components/Pagination';
import { connect } from 'react-redux';
import {
    search,
    decodeCoord,
    setUrl,
    getFilter,
    getCurrentPage,
    getCountResult
} from 'features/search/services/SearchService';
import { searchSuccess } from 'features/search/actions';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import {getTranslate} from 'react-localize-redux';
import 'features/search/styles/search-result.scss';

class Result extends React.Component {

    constructor() {
        super();
        this.state = {
            collection: [],
            meta: {
                totalSize: 0,
                priceRange: [0,0]
            },
            preloader: true,
            sort: 'price',
            order: 'asc',
            page: 1,
            limit: 10,
            filter: {},
            resetFilter: false,
            errors: {}
        };

        this.onChangeSort = this.onChangeSort.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    componentWillMount() {
        this.updateState(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.updateState(nextProps);
    }

    updateState(props) {
        const { location, tripData } = props,
            { query } = location,
            newState = {
                sort: query.sort || 'price',
                order: query.order || 'asc',
                page: +query.page > 0 ? +query.page : 1,
                limit: 10,
                filter: getFilter()
            },
            newTripData = {
                fc: decodeCoord(query.fc) || tripData.from.coordinate,
                tc: decodeCoord(query.tc) || tripData.to.coordinate,
                start_at: query.start_at || tripData.start_at
            };

        this.setState(newState);
        this.getData(
            newTripData.fc,
            newTripData.tc,
            newTripData.start_at,
            newState
        );
    }

    onChangePage(page) {
        setUrl({page});
    }

    onChangeSort(sort) {
        if (sort === this.state.sort) {
            const order = this.state.order === 'asc' ? 'desc' : 'asc';
            setUrl({order});
        } else {
            setUrl({sort});
        }
    }

    onSearch() {
        setUrl({
            "filter[price][min]": null,
            "filter[price][max]": null,
            "filter[time][min]": null,
            "filter[time][max]": null,
            "filter[date]": null,
        });
    }

    getData(fromCoord, toCoord, start_at, {limit, page, sort, order, filter}) {
        this.setState({preloader: true});
        search(fromCoord, toCoord, start_at, page, sort, order, limit, filter)
            .then(response => {
                this.setState({
                    collection: response.data.data,
                    meta: {
                        totalSize: +response.data.meta.total,
                        priceRange: [
                            +response.data.meta.price.min,
                            +response.data.meta.price.max
                        ]
                    },
                    preloader: false
                });
            })
            .catch(error => {
                if (error.response) {
                    this.setState({
                        errors: error.response,
                        preloader: false
                    })
                }
            });
    }

    render() {
        const {sort, order, page, limit, meta, collection, preloader} = this.state,
            {translate} = this.props,
            currentPage = getCurrentPage(page, limit, meta.totalSize),
            countResult = getCountResult(currentPage, collection.length, limit);
        return (
            <div className="search-result">
                <SearchForm onSearch={this.onSearch} />
                <div className="row">
                    <div className="col-md-3">
                        <Filter
                            priceBounds={meta.priceRange}
                        />
                    </div>
                    <div className="col-md-9">
                        <div className="container">
                            <div className="row search-result__header">
                                <div className="col-8 align-self-center">
                                    {translate('search_result.found_trips', {size: meta.totalSize})}
                                </div>
                                <div className="search-result__sort-container col-4">
                                    <SortPanel
                                        sort={sort}
                                        order={order}
                                        onChange={ this.onChangeSort }
                                    />
                                </div>
                            </div>
                            <div className="search-result__item-container">
                                <Preloader enable={preloader}/>
                                {
                                    preloader
                                        ? <Placeholder show={true}>{translate('search_result.loading')}</Placeholder>
                                        : <TripList
                                                collection={collection}
                                            />
                                }
                            </div>
                            <div className="row search-result__pagination">
                                <div className="col-sm-6 align-self-center">
                                    {translate('search_result.showing_of', {count: countResult, size: meta.totalSize})}
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
        tripData: state.search,
        translate: getTranslate(state.locale)
    }),
    (dispatch) => bindActionCreators({searchSuccess},dispatch)
)(Result);
export default withRouter(ResultConnected);
