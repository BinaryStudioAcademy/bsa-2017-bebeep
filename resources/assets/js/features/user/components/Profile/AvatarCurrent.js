import React from 'react';
import { localize } from 'react-localize-redux';

import 'features/user/styles/profile_avatar.scss';

class AvatarCurrent extends React.Component {

    render() {
        const { translate, avatar, onDelete } = this.props;

        return (
            <div className="user-current-avatar">
                <figure className="user-current-avatar__block">
                    <figcaption className="user-current-avatar__caption">
                        { translate('profile_avatar.current_avatar') }
                    </figcaption>
                    <img src={ avatar }
                        className="user-current-avatar__image"
                        alt={ translate('profile_avatar.user_current_avatar') } />
                </figure>
                <div>
                    <button className="image-cropper__btn btn btn-danger"
                            onClick={ onDelete }>
                        { translate('profile_avatar.delete_avatar') }
                    </button>
                </div>
            </div>
        )
    }
}

export default localize(AvatarCurrent, 'locale');
