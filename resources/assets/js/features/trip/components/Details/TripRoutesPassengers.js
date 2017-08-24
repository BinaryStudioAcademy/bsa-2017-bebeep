import React from 'react';
import { localize } from 'react-localize-redux';

class TripRoutesPassengers extends React.Component {

    render() {
        const { translate } = this.props;

        return (
            <section className="block-border p-3 mt-4">
                <header className="trip-section-header">
                    <h3 className="h5">
                        { translate('trip_details.routes_passengers.header') }
                    </h3>
                </header>

                <table className="table table-responsive">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Driver</th>
                        <th>Pass 1</th>
                        <th>Pass 2</th>
                        <th>Pass 3</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Київ</th>
                        <td>+</td>
                        <td>+</td>
                        <td>+</td>
                        <td>+</td>
                      </tr>
                      <tr>
                        <th scope="row">Рівне</th>
                        <td>+</td>
                        <td>+</td>
                        <td>+</td>
                        <td></td>
                      </tr>
                      <tr>
                        <th scope="row">Львів</th>
                        <td>+</td>
                        <td>+</td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                </table>
            </section>
        )
    }
}

export default localize(TripRoutesPassengers, 'locale');
