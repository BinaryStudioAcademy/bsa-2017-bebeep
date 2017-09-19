import React from 'react';
import { localize } from 'react-localize-redux';

import 'features/user/styles/profile_avatar.scss';

class AvatarCurrent extends React.Component {

    renderDeleteButton() {
        const { translate, destWidth, isDefault, onDelete } = this.props;

        return isDefault ? null : (
            <div className="user-profile-avatar__current-avatar-delete"
                style={{ maxWidth: destWidth }}
            >
                <button role="button"
                    className="btn btn-danger user-profile-avatar__current-avatar-delete-btn"
                    onClick={ onDelete }
                >
                    { translate('profile_avatar.delete_avatar') }
                </button>
            </div>
        );
    }

    render() {
        const { translate, avatar, destWidth } = this.props;

        return (
            <div className="user-profile-avatar__current-avatar">
                <figure className="user-profile-avatar__current-avatar-figure">
                    <figcaption className="user-profile-avatar__current-avatar-caption">
                        { translate('profile_avatar.current_avatar') }
                    </figcaption>
                    <img src={ avatar }
                        className="user-profile-avatar__current-avatar-image"
                        alt={ translate('profile_avatar.current_avatar') }
                        style={{ maxWidth: destWidth }} />
                </figure>

                { this.renderDeleteButton() }
            </div>
        )
    }
}

export default localize(AvatarCurrent, 'locale');
