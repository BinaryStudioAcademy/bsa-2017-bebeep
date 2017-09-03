import React from 'react';
import { localize } from 'react-localize-redux';

import 'features/user/styles/profile_avatar.scss';

class AvatarCurrent extends React.Component {

    renderDeleteButton() {
        const { translate, isDefault, onDelete } = this.props;

        return isDefault ? null : (
            <div>
                <button className="image-cropper__btn btn btn-danger"
                        onClick={ onDelete }>
                    { translate('profile_avatar.delete_avatar') }
                </button>
            </div>
        );
    }

    render() {
        const { translate, avatar, destWidth } = this.props;

        return (
            <div className="user-current-avatar">
                <figure className="user-current-avatar__block">
                    <figcaption className="user-current-avatar__caption">
                        { translate('profile_avatar.current_avatar') }
                    </figcaption>
                    <img src={ avatar }
                        className="user-current-avatar__image"
                        alt={ translate('profile_avatar.current_avatar') }
                        style={{ maxWidth: destWidth }} />
                </figure>

                { this.renderDeleteButton() }
            </div>
        )
    }
}

export default localize(AvatarCurrent, 'locale');
