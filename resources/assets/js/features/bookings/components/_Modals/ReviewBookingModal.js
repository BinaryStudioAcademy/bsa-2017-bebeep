import React from 'react';
import { localize } from 'react-localize-redux';
import Modal from 'app/components/Modal';
import ReactStars from 'react-stars';
import Validator from 'app/services/Validator';
import { createReviewRules } from 'app/services/ReviewService';
import { securedRequest } from 'app/services/RequestService';

class ReviewBookingModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: {},
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

    closeModal() {
        this.props.onClose();

        this.setState({
            errors: {},
            rating: 0,
            review: ""
        });
    }

    handleSaveClick(e) {
        e.preventDefault();

        const data = {
            trip_id: this.props.isOpen.id,
            rating: this.state.rating,
            review: this.state.review
        };

        const validated = Validator.validate(createReviewRules(), data);

        if(!validated.valid) {
            this.setState({errors: validated.errors});
            return;
        }

        this.setState({errors: {}});

        securedRequest.post('/api/v1/reviews', data).then((response) => {
            this.closeModal();

        }).catch((error) => {
            this.setState({
                errors: error.response.data
            });
        });
    }

    render() {
        const {translate} = this.props;
        const {errors} = this.state;

        return (
            <div>
                <Modal isOpen={this.props.isOpen} onClosed={this.closeModal.bind(this)}>
                    <div className="modal-header">
                        <h5 className="modal-title">
                            { translate('bookings_list.leave_review') }
                        </h5>
                        <button className="close" aria-label="Close" onClick={this.closeModal.bind(this)}>
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
                            <div className={"form-group " + (errors.review ? 'has-danger' : '')}>
                                <label htmlFor="message-text" className="form-control-label">
                                    <strong>{ translate('bookings_list.review') }</strong>
                                </label>
                                <textarea className={"form-control " + (errors.review ? 'form-control-danger' : '')}
                                          id="message-text"
                                          placeholder={ translate('bookings_list.leave_review_placeholder') }
                                          onChange={this.reviewChanged.bind(this)}
                                          value={this.state.review}
                                />
                                <div className="form-control-feedback">{ errors.review }</div>
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