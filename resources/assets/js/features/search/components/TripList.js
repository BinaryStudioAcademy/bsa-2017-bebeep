import React from 'react';
import { connect } from 'react-redux';
import { search } from '../../../app/services/TripService';
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

    getData() {
        const {limit, page, sort, order} = this.state;
        search(this.props.tripData, page, sort, order, limit)
            .then(response => this.setState({ tripsList: response.data }))
            .catch(error => this.setState({ errors: error.response.data }));
    }

    componentWillMount() {
        this.getData();
    }

    componentWillReceiveProps(nextProps) {
        this.getData();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.page !== this.state.page) {
            this.getData();
        }
        return true;
    }

    render() {
        const { tripsList, limit, page, sort, order } = this.state;

        return (
            <div>
                {tripsList.data.map((trip) =>
                    <TripItem key={trip.id} trip={trip} />
                )}
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