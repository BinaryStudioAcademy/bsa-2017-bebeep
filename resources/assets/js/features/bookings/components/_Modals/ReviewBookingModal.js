import React from 'react';
import { localize } from 'react-localize-redux';
import Modal from 'app/components/Modal';
import ReactStars from 'react-stars';

class ReviewBookingModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            review: ""
        }
    }

    ratingChanged(newRating) {
        this.setState({rating: newRating});
    }

    reviewChanged(e) {
        this.setState({review: e.target.value});
    }

    handleSaveClick(e) {
        e.preventDefault();

        console.log("Rating", this.state.rating);
        console.log("Review", this.state.review);
    }

    render() {
        const {translate} = this.props;

        return (
            <div>
                <Modal isOpen={this.props.isOpen} onClosed={this.props.onClose}>
                    <div className="modal-header">
                        <h5 className="modal-title">
                            { translate('bookings_list.leave_review') }
                        </h5>
                        <button className="close" aria-label="Close" onClick={this.props.onClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-sm-4 align-self-center">
                                        <strong>{ translate('bookings_list.rating') } {"(" + this.state.rating + ")"}</strong>
                                    </div>
                                    <div className="col-sm-8">
                                        <ReactStars
                                            id="rating"
                                            count={5}
                                            size={30}
                                            value={this.state.rating}
                                            onChange={this.ratingChanged.bind(this)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="message-text" className="form-control-label">
                                    <strong>{ translate('bookings_list.review') }</strong>
                                </label>
                                <textarea className="form-control"
                                          id="message-text"
                                          placeholder={ translate('bookings_list.leave_review_placeholder') }
                                          onChange={this.reviewChanged.bind(this)}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={ this.handleSaveClick.bind(this) }>
                            { translate('bookings_list.btn_save') }
                        </button>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default localize(ReviewBookingModal, 'locale');