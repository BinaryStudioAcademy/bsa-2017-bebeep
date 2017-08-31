import React from 'react';

class ContainerWrapper extends React.Component {

    render() {
        const { className } = this.props;

        return (
            <div className={"container py-4 " + className}>
                { this.props.children }
            </div>
        );
    }
}

ContainerWrapper.defaultProps = {
    className: '',
};


export default ContainerWrapper;
