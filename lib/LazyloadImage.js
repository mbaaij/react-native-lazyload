import React, {
    Component,
    PropTypes
} from 'react';
import {
    Image,
    Platform
} from 'react-native';
import LazyloadView from './LazyloadView';
import Anim from './Anim';
const emptySource = {uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEX/TQBcNTh/AAAAAXRSTlMAQObYZgAAAApJREFUeJxjYgAAAAYAAzY3fKgAAAAASUVORK5CYII='};

class LazyloadImage extends LazyloadView{
    static displayName = 'LazyloadImage';

    static propTypes = {
        host: PropTypes.string,
        initialVisibility: PropTypes.bool,
        animation: PropTypes.oneOfType([
            PropTypes.shape({
                duration: PropTypes.number,
                create: Anim,
                update: Anim,
                delete: Anim
            }),
            PropTypes.bool
        ]),
        ...Image.propTypes
    };

    render() {
        let key = null;

        if (this.props.animation) {
            key = this.state.visible ? 'visible' : 'invisible';
        }
        return this.props.host ? <Image
            ref={ele => this._root = ele}
            {...this.props}
            onLayout={this._onLayout}
            key={key}
            source={this.state.visible ? this.props.source : emptySource}
        /> : <Image
            ref={ele => this._root = ele}
            {...this.props}
        />;
    }
}

export default LazyloadImage;
