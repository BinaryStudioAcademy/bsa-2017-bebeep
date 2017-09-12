import React from 'react';

import ContainerWrapper from '../layouts/ContainerWrapper';
import DateTimeHelper from '../helpers/DateTimeHelper';

class MainFooter extends React.Component {

    render() {
        return (
            <ContainerWrapper>
                <footer className="application-footer">
                    <p className="application-footer__copyrights">
                        &copy; BeBeep, {DateTimeHelper.getCurrentDateTime('YYYY')}
                    </p>
                    <div className="application-footer__content">
                        <p><strong>BeBeep</strong> — це Ваш надійний помічник у пошуку спільних поїздок. Ми об’єднуємо водіїв і пасажирів, яким по дорозі, для міжміських поїздок за дешевшими цінами.</p>
                        <p>З <strong>BeBeep</strong> ваша наступна поїздка буде вигідною та зручною!</p>
                    </div>
                </footer>
            </ContainerWrapper>
        );
    }
}

export default MainFooter;
