import React from 'react';
import Filter from './Filter';
import SearchForm from './SearchForm';
import TripList from './TripList';
import Placeholder from './Placeholder';
import SortPanel from './SortPanel';
import Preloader from 'app/components/Preloader';
import ContainerWrapper from 'app/layouts/ContainerWrapper';
import SubscribeModal from './_Modals/SubscribeModal';
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
import { searchSuccess, setSearchFilters } from 'features/search/actions';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import {getTranslate} from 'react-localize-redux';
import CurrencyService from 'features/currency/services/CurrencyService';
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
            errors: {},
            subscribeModalIsOpen: false,
            searchRequestStart: false,
        };

        this.onChangeSort = this.onChangeSort.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onClickSubscribe = this.onClickSubscribe.bind(this);
    }

    componentWillMount() {
        this.updateState(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.activeCurrency.id !== undefined &&
            nextProps.activeCurrency.id !== this.props.activeCurrency.id
        ) {
            return;
        }
        this.updateState(nextProps);

        /*const currency = CurrencyService.getCurrencyById(1);

        CurrencyService.convertValue(this.state.meta.priceRange[0], currency);
        CurrencyService.convertValue(this.state.meta.priceRange[1], currency);*/
    }

    updateState(props) {
        const currencyId = +props.activeCurrency.id;
        if (isNaN(currencyId)) {
            return;
        }

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
            currencyId,
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
            "currency_id": this.props.activeCurrency.id,
            "filter[price][min]": null,
            "filter[price][max]": null,
            "filter[currency_id]": null,
            "filter[time][min]": null,
            "filter[time][max]": null,
            "filter[date]": null,
            "filter[animals]": null,
            "filter[luggage]": null,
            "filter[seats]": null,
            "filter[rating]": null,
            "filter[transfer]": null,
        });
    }

    getData(fromCoord, toCoord, currencyId, start_at, {limit, page, sort, order, filter}) {
        if (this.state.searchRequestStart) {
            return;
        }

        this.setState({
            preloader: true,
            searchRequestStart: true,
        });

        search(fromCoord, toCoord, currencyId, start_at, page, sort, order, limit, filter)
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
                    preloader: false,
                    searchRequestStart: false,
                });
            })
            .catch(error => {
                if (error.response) {
                    this.setState({
                        errors: error.response,
                        preloader: false,
                        searchRequestStart: false,
                    })
                }
            });
    }

    onClickSubscribe() {
        this.setState({subscribeModalIsOpen: true});
        this.props.setSearchFilters(this.state.filter);
    }

    render() {
        const {sort, order, page, limit, meta} = this.state,
            {collection, preloader, subscribeModalIsOpen} = this.state,
            {translate, activeCurrency} = this.props,
            currentPage = getCurrentPage(page, limit, meta.totalSize),
            countResult = getCountResult(currentPage, collection.length, limit);

        return (
            <div className="search-result">
                <SearchForm onSearch={this.onSearch} />
                <ContainerWrapper>
                    <div className="row">
                        <div className="col-md-3">
                            <Filter
                                priceBounds={meta.priceRange}
                                priceCurrencySign={activeCurrency.sign}
                            />
                            <div className="text-center">
                                <button role="button" className="btn search-block__btn search-result__btn-subscribe" onClick={this.onClickSubscribe}>
                                    {translate('subscription.subscribe_btn')}
                                </button>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="container">
                                <div className="row search-result__header">
                                    <div className="col-8 align-self-center search-result__header-count">
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
                                    <TripList
                                        collection={collection}
                                    />
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
                </ContainerWrapper>
                <SubscribeModal
                    isOpen={ subscribeModalIsOpen }
                    onClosed={ () => this.setState({subscribeModalIsOpen: false})}
                />
            </div>
        );
    }
}

const ResultConnected = connect(
    (state) => ({
        tripData: state.search,
        translate: getTranslate(state.locale),
        activeCurrency: state.currency.activeCurrency,
    }),
    (dispatch) => bindActionCreators({searchSuccess, setSearchFilters}, dispatch)
)(Result);
export default withRouter(ResultConnected);
