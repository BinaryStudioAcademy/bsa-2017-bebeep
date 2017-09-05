import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import {markAsRead} from 'app/services/NotificationService';
import {markAsReadNotification} from '../../actions';
import { Collapse } from 'reactstrap';
import DateTimeHelper from 'app/helpers/DateTimeHelper'
import '../../styles/notification.scss';

class Notification extends React.Component {
    constructor() {
        super();

        this.state = {
            isOpenMessage: false
        };

        this.toggleMessage = this.toggleMessage.bind(this);
    }

    toggleMessage() {
        const {read, markAsReadNotification, notificationId} = this.props;

        this.setState({isOpenMessage: !this.state.isOpenMessage});

        if (!read) {
            markAsRead(notificationId);
            markAsReadNotification(notificationId);
        }
    }

    render() {
        const {translate, date, read, title, type} = this.props,
            {isOpenMessage} = this.state,
            dateMessage = DateTimeHelper.dateFormatLocale({timestamp: date}),
            titleClass = "notification__title notification__state notification__state--" +
                (type || "default") +
                (read ? " notification__state--read" : "") +
                (isOpenMessage ? " notification__title--active" : ""),
            envelopeClass = "notification__envelope fa" +
                (read ? " fa-envelope-open-o" : " fa-envelope") +
                " text-" + (type || "default"),
            titleTextClass = "notification__title-text" + (read ? " text-muted" : "");

        return (
            <div className="w-100 notification">
                <div className={titleClass} onClick={this.toggleMessage}>
                    <div className="row">
                        <div className="col-sm-3">
                            <small className="text-muted">{dateMessage}</small>
                        </div>
                        <div className="col-sm-8">
                            <div className={titleTextClass}>{title}</div>
                        </div>
                        <div className="col-sm-1 col-2 hidden-xs-down">
                            <i className={envelopeClass}
                            />
                        </div>
                    </div>
                </div>
                <Collapse isOpen={isOpenMessage}>
                    <div className="notification__text">
                        {this.props.children}
                    </div>
                </Collapse>
            </div>
        );
    }
}

Notification.PropTypes = {
    date: PropTypes.number.isRequired,
    read: PropTypes.bool.isRequired,
    title: PropTypes.string,
    type: PropTypes.string
};

export default connect(
    state => ({
        translate: getTranslate(state.locale)
    }),
    dispatch => bindActionCreators({markAsReadNotification}, dispatch)
)(Notification);
