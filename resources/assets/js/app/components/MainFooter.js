import React from 'react';
import { Link } from 'react-router';
import { localize } from 'react-localize-redux';

import ContainerWrapper from '../layouts/ContainerWrapper';
import DateTimeHelper from '../helpers/DateTimeHelper';

class MainFooter extends React.Component {

    render() {
        const { translate } = this.props;

        return (
            <div className="application-footer-wrapper">
                <ContainerWrapper className="pb-2 pt-3">
                    <footer className="application-footer">
                        <p className="application-footer__copyrights">
                            &copy; <Link to="/">BeBeep</Link>, {DateTimeHelper.getCurrentDateTime('YYYY')}. {translate('app-footer.copyrights')}
                        </p>
                        <div className="application-footer__content">
                            {translate('app-footer.content')}
                        </div>
                    </footer>
                </ContainerWrapper>
            </div>
        );
    }
}

export default localize(MainFooter, 'locale');
