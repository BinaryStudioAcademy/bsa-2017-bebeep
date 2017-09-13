import React from 'react';

const TAB_CLASS_ACTIVE = 'wizard-tabs__tab_active';

class WizardTab extends React.Component {

    setTabActive(){
        const { isActive } = this.props;

        return isActive ? TAB_CLASS_ACTIVE : '';
    }

    render() {
        const { isShow, image, title, onClick } = this.props;

        if (!isShow) {
            return null;
        }

        return (
            <a href="#" onClick={onClick}
               className={'wizard-tabs__tab ' + this.setTabActive()}
            >
                <img src={image} alt={title} />
                <span>{title}</span>
            </a>
        );
    }
}

WizardTab.defaultProps = {
    isActive: false,
    isShow: true,
};

export default WizardTab;
